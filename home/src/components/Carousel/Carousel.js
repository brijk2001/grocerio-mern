import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Products from './Products';
import { productData, responsive } from './data';
import './Carousel.css'

const products = productData.map(item => (
    <Products name={item.name} url={item.imageUrl} alt={item.alt} />
))

function Carousel1() {
    return (
        <div className="Carousel1">
            <h1>Popular Products</h1>
            <Carousel responsive={responsive} showDots={false} infinite={true} centerMode={true} >
                {products}
            </Carousel>
        </div>
    );
};

export default Carousel1;