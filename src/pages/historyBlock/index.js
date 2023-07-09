import "./style.css";
import CustomInput from "../../ui/customInput";
import { useEffect, useState } from "react";
import { useFetching } from "../../useFetching";
import Loading from "../../ui/loader";
import CustomButton from "../../ui/customButton";
import { serverAddress } from "../../serverAddress";
import BoardEmpty from "../../ui/boardEmpty/boardEmpty";

const HistoryBlock = () => {
  const [inputsData, setInputsData] = useState({});
  const [foundOrders, setFoundOrders] = useState(null);
  const [ordersList, setordersList] = useState([]);

  const [fetchOrders, isLoading, error] = useFetching(async () => {
    const response = await fetch(`${serverAddress}getorders?email=${inputsData.email}`, {
      credentials: "include",
    });

    const data = await response.json();
    setFoundOrders(data);
  });

  useEffect(() => {
    if (foundOrders) {
      setordersList([...Object.keys(foundOrders).filter((order) => order != "products")]);
    }
  }, [foundOrders]);

  function searchHandler() {
    setordersList([]);
    fetchOrders();
  }

  return (
    <div className="history-wrapper">
      <div className="history-inputs">
        <CustomInput name="email" setInputsData={setInputsData} state={inputsData}>
          Email :
        </CustomInput>

        <CustomButton disabled={!inputsData.email ? true : false} action={() => searchHandler()}>
          Search
        </CustomButton>
      </div>

      <div className="history-orders">
        {isLoading && <Loading />}
        {error && <BoardEmpty type={"error"}>{error}</BoardEmpty>}

        {ordersList.map((order) => {
          let totalPrice = 0;

          foundOrders[+order].forEach((product_set) => {
            let productSum =
              +Object.values(product_set) * +foundOrders.products[+Object.keys(product_set).join("")].price;

            totalPrice += productSum;
          });

          return (
            <div className="order-wrapper" key={order}>
              <div className="order-list">
                {foundOrders[+order].map((product) => {
                  let productDescription = foundOrders.products[+Object.keys(product).join("")];
                  let productAmount = +Object.values(product).join("");

                  return (
                    <div className="product-wrapper" key={product.id}>
                      <div className="task_img">
                        <img
                          src={`./../../product_img/${productDescription.image}`}
                          alt={productDescription.product_name}
                        />
                      </div>
                      <div className="task-title">{productDescription.product_name}</div>
                      <div className="task-body">
                        <div className="completed-subtasks">{productDescription.price} UAH</div>
                        <div className="completed-subtasks">{productAmount} pcs</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="total-block">Total price: {totalPrice} UAH</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryBlock;
