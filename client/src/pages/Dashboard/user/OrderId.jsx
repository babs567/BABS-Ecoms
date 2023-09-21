import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../config/store";
import useFetchData from "../../../hooks/fetchData";
import { Col, Row, Image } from "react-bootstrap";
import Loader from "../../../utils/Loader";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getOrderDetail } from "../../../config/api";
import { format } from "timeago.js";

export default function OrderID() {
  const { orderId } = useParams();
  const [isPay, setNotpay] = useState();
  const { currentUser } = useStore();
  const { data, error, loading } = useFetchData(
    getOrderDetail,
    orderId,
    currentUser?.access_token
  );

  useEffect(() => {
    document.title = `Your order ${data?._id}`;
  }, [data?._id]);
  error && <p className="mt-5 fs-5">{error.message}</p>;
  const track = data.status;

  useEffect(() => {
    track === 0 ? setNotpay("Preparing") : "";
    track === 1 ? setNotpay("On the way") : "";
    track === 2 ? setNotpay("Delivered") : "";
  }, [track]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={4} className="mb-3">
            <div className="mb-3">
              <p className="fs-6">
                <span className="fw-bold fs-5 me-1">Order id:</span>
                {orderId}
              </p>
              <p className="fs-6">
                <span className="fw-bold fs-5 me-1">Quantity:</span>
                {data?.orderItems?.length} items(s)
              </p>
              <p>Placed order {format(data?.createdAt)}</p>
            </div>
          </Col>
          <Col md={5} className="mb-3">
            <div>
              <p className="mb-1 fs-5 fw-bold">Product</p>
              {data?.orderItems?.map((order) => (
                <div
                  key={order._id}
                  className="d-flex flex-wrap aling-items-center gap-2 mb-2"
                >
                  <Image
                    src={order.images[0]}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <span className="mb-1 fs-6">
                      {order.title?.length > 40
                        ? order.title.slice(0, 40) + "..."
                        : order.title}
                    </span>
                    <br />
                    <span className="fs-6">{formatCurrency(order.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div className="mb-2">
              <p className="mb-1 fs-5 fw-bold">Payment status</p>
              {data.isPaid ? (
                <p className="fs-6 mb-0">Paid {data.paidAt}</p>
              ) : (
                <p className="fs-6 mb-0">Not paid</p>
              )}
            </div>
            <div className="mb-2">
              <p className="mb-1 fs-5 fw-bold">Delivery status</p>
              {data.isPaid ? (
                <p className="fs-6 mb-0">Delivered {data.deliveredAt}</p>
              ) : (
                <p className="fs-6 mb-0">{isPay}</p>
              )}
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <>
              <h1 className="fs-6 fw-bold">PAYMENT INFORMATION</h1>
              <p className="fs-5 fw-medium mb-1">Payment method</p>
              <p className="fs-5">Mode: {data.paymentMethod}</p>
              <p className="fs-5 fw-medium mb-1">Payment detail</p>
              {data.orderItems?.map((order) => (
                <p key={order._id} className="fs-6 mb-1">
                  Item price: {formatCurrency(order.price)}
                </p>
              ))}
              <p className="fs-6 mb-1">Tax: {formatCurrency(data.taxPrice)}</p>
              <p className="fs-6 mb-1">
                Delivery Fee: {formatCurrency(data.shippingPrice)}
              </p>
              <p className="fs-6 mb-1 fw-bold">
                Total: {formatCurrency(data.totalPrice)}
              </p>
            </>
          </Col>
          <Col md={6} className="mb-3">
            <>
              <h1 className="fs-6 fw-bold">DELIVERY INFORMATION</h1>
              <p className="fs-5 fw-medium mb-1">Delivery method</p>
              <p className="fs-5">{data.shippingDetails?.address}</p>
              <p className="fs-6 mb-1">
                Receiver: {data.shippingDetails?.fullname}
              </p>
              <p className="fs-6 mb-1">Phone: {data.shippingDetails?.phone}</p>
              <p className="fs-6 mb-1">
                Location: {data.shippingDetails?.state}
              </p>
              <p className="fs-5 fw-bold mb-1">Buyer info</p>
              <p className="fs-6 text-capitalize mb-1">
                Name: {data?.user?.username}
              </p>
              <p className="fs-6">Email: {data?.user?.email}</p>
            </>
          </Col>
        </Row>
      )}
    </>
  );
}

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useStore } from "../../../config/store";
// import useFetchData from "../../../hooks/fetchData";
// import { Col, Row, Image } from "react-bootstrap";
// import Loader from "../../../utils/Loader";
// import { formatCurrency } from "../../../utils/formatCurrency";
// import { getOrderDetail } from "../../../config/api";
// import { format } from "timeago.js";

// export default function OrderId() {
//   const { orderId } = useParams();
//   const [isPay, setNoPay ]= useState('')
//   const { currentUser } = useStore();
//   const { data, error, loading } = useFetchData(
//     getOrderDetail,
//     orderId,
//     currentUser?.access_token
//   );
//   console.log("orderId", data);

//   useEffect(() => {
//     document.title = `Your order ${data?._id}`;
//   }, [data?._id]);
//   error && <p className="mt-5 fs-5">{error.message}</p>;
//   const track = data.status

//   useEffect(()  => {
//     track === 0 ? setNotPay('Preparing')
//   }
//   )
//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Row>
//           <Col md={4} className="mb-3">
//             <div className="mb-3">
//               <p className="fs-6">
//                 <span className="fw-bold fs-5 me-1">Order id:</span>
//                 {orderId}
//               </p>
//               <p className="fs-6">
//                 <span className="fw-bold fs-5 me-1">Quantity:</span>
//                 {data?.orderItems?.length} items(s)
//               </p>
//               <p>Placed order {format(data?.createdAt)}</p>
//             </div>
//           </Col>
//           <Col md={5} className="mb-3">
//             <div>
//               <p className="mb-1 fs-5 fw-bold">Product</p>
//               {data?.orderItems?.map((order) => (
//                 <div
//                   key={order._id}
//                   className="d-flex flex-wrap aling-items-center gap-2 mb-2"
//                 >
//                   <Image
//                     src={order.images[0]}
//                     style={{
//                       width: "70px",
//                       height: "70px",
//                       objectFit: "contain",
//                     }}
//                   />
//                   <div>
//                     <span className="mb-1 fs-6">
//                       {order.title?.length > 40
//                         ? order.title.slice(0, 40) + "..."
//                         : order.title}
//                     </span>
//                     <br />
//                     <span className="fs-6"> {formatCurrency(order.price)}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Col>
//           <Col md={3} className="mb-3">
//             <div className="mb-2">
//               <p className="mb-1 fs-5 fw-bold"> payment status</p>
//               {data.ispaid ? (
//                 <p className="fs-6 mb-0">Paid {data.paidAt}</p>
//               ) : (
//                 <p className="fs-6 mb-0">Not paid</p>
//               )}
//             </div>
//             <div className="mb-2">
//               <p className="mb-1 fs-5 fw-bold"> Delivery status</p>
//               {data.ispaid ? (
//                 <p className="fs-6 mb-0">Delivered {data.deliveryAt}</p>
//               ) : (
//                 <p className="fs-6 mb-0">Not Delivered</p>
//               )}
//             </div>
//           </Col>
//           <hr />
//           <Col md={6} className="mb-3">
//             <>
//               <h1 className="fs-6 fw-bold"> PAYMENT INFORMATION</h1>
//               <p className="fs-5 fw-medium mb-1"> payment method </p>
//               <p className="fs-6">Mode: {data.paymentMethod}</p>
//               <p className="fs-5 fw-medium mb-1"> Payment detail</p>
//               {data.orderItems?.map((order) => (
//                 <p key={order._id} className="fs-6 mb-1">
//                   Item price: {formatCurrency(order.price)}
//                 </p>
//               ))}
//               <p className="fs-6 mb-1"> Tax: {formatCurrency(data.taxPrice)}</p>
//               <p className="fs-6 mb-1"> Deliver Fee: {formatCurrency(data.shippingPrice)}</p>
//               <p className="fs-6 mb-1"> Total: {formatCurrency(data.totalPrice)}</p>
//             </>
//           </Col>
//           <Col md={6} className="mb-3">
//             <>
//               <h1 className="fs-6 fw-bold"> PAYMENT INFORMATION</h1>
//               <p className="fs-5 fw-medium mb-1"> payment method </p>
//               <p className="fs-6 mb-1"> {data.shippingDetails?.address}</p>
//               <p className="fs-6 mb-">
//                 Receiver: {data.shippingDetails?.fullname}
//               </p>
//               <p className="fs-6 mb-">Phone: {data.shippingDetails?.phone}</p>
//               <p className="fs-6 mb-">
//                 Location: {data.shippingDetails?.state}
//               </p>
//               <p className="fs-5 fw-bold mb-1"> Buyer info</p>
//               <p className="fs-6 text-capitalize mb-1">
//                 Name: {data?.user?.username}
//               </p>
//               <p className="fs-6">Email: {data?.user?.email} </p>
//             </>
//           </Col>
//         </Row>
//       )}
//     </>
//   );
// }
