import { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { set } from "react-hook-form";
import { formatCurrency } from "../utils/formatCurrency";
import { useStore } from "../config/store";

export default function FeaturedProduct({ data }) {
  const [current, setCurrent] = useState(0);
  const length = data.length;
  const {increaseCartQty,setShow} = useStore()
  const addToCart=(item)=>{
    increaseCartQty(item)
    toast.success(`${item.title}added to bag `)
    setShow(true)
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-4 mb-2">
        <div className="w-50 h-0 border border-black" />
        <h1 className="text-center fs-3 text-uppercase fw-bold">
          Featured Product
        </h1>
        <div className="w-50 h-0 border border-black" />
      </div>
      <Row className="justify-content-between align-items-center">
        <Col md={6} lg={5}>
          <div className="mx-auto w-100 h-100 px-3">
            {data.map((product, i) => (
              <div key={product._id}>
                {i === current && (
                  <>
                    {product.images?.map((image, i) => (
                      <div
                        key={i}
                        className="w-100 h-100 px-3 position-relative"
                      >
                        {i === current && (
                          <>
                            <Link
                              to={`/collections/${product.category}/${product.slug}`}
                            >
                              <Image
                                src={image}
                                alt={product.title}
                                style={{
                                  width: "100%",
                                  height: "500px",
                                  objectFit: "contain",
                                  position: "relative",
                                }}
                              />
                            </Link>
                            <BsArrowLeftCircle
                              className="position-absolute top-50 start-0 translate-middle text-black z-2"
                              style={{ cursor: "pointer" }}
                              size="1.8rem"
                              onClick={prevSlide}
                            />
                            <BsArrowRightCircle
                              className="position-absolute top-50 start-100 translate-middle text-black z-2 "
                              size="1.8rem"
                              style={{ cursor: "pointer" }}
                              onClick={nextSlide}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </Col>
        <Col md={5} className="text-center text-md-start">
          {data.map((product, i) => (
            <div key={product._id}>
              {i === current && (
                <>
                  <Link
                    to={`/collections/${product.category}/${product.slug}`}
                    className="fw-bold text-black"
                  >
                    {product.title}
                  </Link>
                  <h1 className="fs-4">{formatCurrency(product.price)}</h1>
                  <Button variant="dark rounded-0" onClick={()=>addToCart(product)}>ADD TO BAG</Button>
                </>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
}








































































// import { useState } from "react";
// import { Button, Image, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
// import { formatCurrency } from "../utils/FormatCurrency";

// export default function FeaturedProduct({ data }) {
//   const [current, setCurrent] = useState(0);
//   console.log("dd", data);
//   const length = data.length;
//   const nextSlide = () => {
//     setCurrent(current == length - 1 ? 0 : current + 1);
//   };
//   const prevSlide = () => {
//     setCurrent(current == 0 ? length - 1 : current - 1);
//   };
//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center gap-4 mb-2">
//         <div className="w-50 h-0 border border-black"></div>
//         <h1 className="text-center fs-3 text-uppercase fw-bold">
//           Featured Products
//         </h1>
//         <div className="w-50 h-0 border border-black"></div>
//       </div>
//       <Row className="justify-content-between align-item-center center-div ">
//         <Col md={6} lg={5}>
//           <div className="mx-auto w-100 px-3">
//             {data.map((product, i) => (
//               <div key={product._id}>
//                 {i === current && (
//                   <>
//                     {product.images?.map((image, i) => (
//                       <div
//                         key={i}
//                         className="position-relative w-100 h-100 px-3"
//                       >
//                         {i === current && (
//                           <>
//                             <Link
//                               to={`/collections/${product.category}/${product.slug}`}
//                             >
//                               <Image
//                                 src={image}
//                                 alt={product.title}
//                                 style={{
//                                   width: "100%",
//                                   height: "400px",
//                                   objectFit: "contain",
//                                 }}
//                               />
//                             </Link>
//                             <BsArrowLeftCircle
//                               className="position-absolute top-50 start-0 translate-middle text-black z-2"
//                               size="1.8rem"
//                               style={{ cursor: "pointer" }}
//                               onClick={prevSlide}
//                             />
//                             <BsArrowRightCircle
//                               className="position-absolute top-50 start-100 translate-middle text-black z-2"
//                               size="1.8rem"
//                               style={{ cursor: "pointer" }}
//                               onClick={nextSlide}
//                             />
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </Col>
//         <Col md={5} className="text-center text-md-start">
//           {data.map((product, i) => (
//             <div key={product._id}>
//               {i === current && (
//                 <>
//                   <Link
//                     to={`/collecions/${product.category}/${product.slug}`}
//                     className="fw-bold text-black"
//                   >
//                     {product.title}
//                   </Link>
//                   <h1 className="fs-2">{formatCurrency(product.price)}</h1>
//                   <Button variant="dark rounded-2">ADD TO BAG</Button>
//                 </>
//               )}
//             </div>
//           ))}
//         </Col>
//       </Row>
//     </>
//   );
// }














































































// import { useState } from "react";
// import { Button, Col, Image, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast"
// import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
// import { formatCurrency } from "..utils/formatcurrency";

// export default function FeaturedProduct({ data }) {
//   const [current, setCurrent] = useState(0);
//   console.log("featured", data);
//   const length = data.length; // 3 products
//   console.log("lrgn", length);

//   const nextSlide = () => {
//     setCurrent(current === length - 1 ? 0 : current + 1);
//   };
//   const prevSlide = () => {
//     setCurrent(current === 0 ? length - 1 : current - 1);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center gap-4 mb-2">
//         <div className="w-50 h-0 border border-black" />
//         <h1 className="text-center fs-3 text-uppercase fw-bold">
//           Featured Product
//         </h1>
//         <div className="w-50 h-0 border border-black" />
//       </div>

//       <Row className="justify-content-between align-items-center">
//         <Col md={6} lg={5}>
//           <div className="mx-auto w-100 h-100 px-3">
//             {data.map((product, i) => (
//               <div key={product._id}>
//                 {i === current && (
//                   <>
//                     {product.images?.map((image, i) => (
//                       <div
//                         key={i}
//                         className="position-relative w-100 h-100 px-3"
//                       >
//                         {i === current && (
//                           <>
//                             <Link
//                               to={`/collections/${product.category}/${product.slug}`}
//                             >
//                               <Image
//                                 src={image}
//                                 alt={product.title}
//                                 style={{
//                                   width: "100%",
//                                   height: "400px",
//                                   objectFit: "contain",
//                                 }}
//                               />
//                             </Link>
//                             <BsArrowLeftCircle
//                               className="position-absolute top-50 start-0 translate-middle text-black z-2"
//                               size="1.8rem"
//                               style={{ cursor: "pointer" }}
//                               onClick={prevSlide}
//                             />
//                             <BsArrowRightCircle
//                               className="position-absolute top-50 start-100 translate-middle text-black z-2"
//                               size="1.8rem"
//                               style={{ cursor: "pointer" }}
//                               onClick={nextSlide}
//                             />
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </Col>
//         <Col md={5} className="text-center text-md-start">
//           {data.map((product, i) => {
//             <div key={product._id}>
//               {i === current && (
//                 <>
//                   <Link
//                     to={`/collections/${product.category}/${product.slug}`}
//                     className="fw-bold text-black"
//                   >
//                     {product.title}
//                   </Link>
//                   <h1 className="fs-4">{formatCurrency(product.price)}</h1>
//                   <Button variant="dark rounded-0">ADD TO BAG</Button>
//                 </>
//               )}
//             </div>;
//           })}
//         </Col>
//       </Row>
//     </>
//   );
// }
