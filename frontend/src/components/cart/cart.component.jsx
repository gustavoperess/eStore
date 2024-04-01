import "./cartStyle.css";
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from "react-router-dom"; 
import { Form, Button, Modal, Container, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUser } from "../../contexts/UserContext";
import VisitorAPI from 'visitorapi';
import countries from 'country-list';
import "bootstrap-icons/font/bootstrap-icons.css";

function CartComponent() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { userData, refreshUserData } = useUser();
    const [formData, setFormData] = useState({ name: userData?.name || '' });
    const [initiaCountry, setInitiaCountry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [city, setSelectedCity] = useState("");
    const [zip, setSelectedZip] = useState("");
    const [address, setSelectedAddress] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [formValidationFailed, setFormValidationFailed] = useState(false);


    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const data = await VisitorAPI("MY API KEY HERE"); // B878v04eK6t1EbCNsi7r 
                setInitiaCountry(data.countryName); 
                setSelectedCountry(data.countryName || "United States of America");
            } catch (error) {
                setSelectedCountry("United States of America");
            }
        };

        fetchCountry();
    }, []);

    const { cartItems, cartCount, totalAmount, removeFromCart, addToCart, decreaseItem, increaseItem, updateItem } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(price);
    };

    const handleShoppingClick = async (product) => {
        try {
            removeFromCart(product);
        } catch (err) {
            console.log("Product not removed", err);
        }
    };

    const handleForwardClick = () => {
        if (userData) {
            handleShow();
        } else {
            navigate("/login");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleAddreessChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleZipChange = (event) => {
        setSelectedZip(event.target.value);
    };

    const handleReturnToCheckout = () => {
        setShowPaymentModal(false); 
        setShow(true); 
    };

    const handleProceedToCheckout = () => {
        if (!city || !zip || !address) {
            setFormValidationFailed(true);
            setTimeout(() => setFormValidationFailed(false), 500); 
        } else {
            setFormValidationFailed(false); // Reset on successful validation
            handleClose(); 
            setShowPaymentModal(true);  
        }
    };


    return (
        <Container>
            <div className="my-bag-container">
                <h1>Your Bag</h1>
                <Button variant="primary" size="lg" onClick={handleForwardClick}>
                    Proceed to checkout
                </Button>
            </div>
            <div className="my-bag-products">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Edit</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {cartItems.map((product, index) => (
                        <tbody key={index} className="table-body">
                            <tr>
                                <td className="table-body-product"> 
                                    <img className="myImage" src={product?.productPicture ? product?.productPicture : 'default-picture-url'} alt={product.productPicture} />
                                    <div className="table-body-product-text">
                                        <h1>{product.productName}</h1>
                                        <p>{product.productCategory}</p>
                                        <p>{product.productGender}</p>
                                    </div>     
                                </td>
                                <td className="table-body-edit">
                                    <div className="quantity-selector">
                                        <button className="decrease-quantity" onClick={() => decreaseItem(product)}>-</button>
                                        <input type="text" value={product.quantity} size={2} className="quantity-input" readOnly />
                                        <button className="increase-quantity" onClick={() => increaseItem(product)}>+</button>
                                    </div>
                                    <div className="edit-buttons">
                                        <Button variant="outline-primary" size="sm" onClick={() => updateItem(product)}>Update</Button>
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleShoppingClick(product._id)}>Remove</Button>
                                    </div>
                                </td>
                                <td className="table-body-price">{formatPrice(product.productPrice)}</td>
                            </tr>
                        </tbody>
                    ))}
                    <tbody>
                        <tr className="table-total"> 
                            <td colSpan={3}><p>Subtotal: {formatPrice(totalAmount)}</p></td>
                        </tr>
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose} className={`my-custom-modal ${formValidationFailed ? 'horizontal-shaking-animation' : ''}`}>
                <Modal.Header className="modal-header">
                        <div className="close-area" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <Modal.Title className="modal-title">
                            <h6>VanShoppFY</h6>
                            <p>your total is {formatPrice(totalAmount)}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <Form className="addressControl">
                            <Form.Group >
                                <div className="person"> 
                                    <i className="bi bi-person icontwo"></i>
                                    <Form.Control 
                                        type="text" 
                                        name="name"
                                        placeholder="Enter name"
                                        value={formData.name} 
                                        onChange={handleChange}
                                        className={formValidationFailed && !formData.name ? 'form-control-error' : ''}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group >
                                <div className="address">
                                    <i className="bi bi-geo-alt icontree"></i>
                                    <Form.Control 
                                        type="text" 
                                        name="Address"
                                        placeholder="Address"
                                        onChange={handleAddreessChange}
                                        className={formValidationFailed && !address ? 'form-control-error' : ''}
                                    />
                                </div>
                            </Form.Group> 
                            <div className="ZipCityDiv">
                                <Form.Group className="zip" >
                                <i className="bi bi-map icon"></i>
                                    <Form.Control  
                                        type="text"
                                        name="Zip"
                                        placeholder="Zip/Postal Code"
                                        onChange={handleZipChange}
                                        className={formValidationFailed && !zip ? 'form-control-error' : ''}
                                    />
                                </Form.Group>  
                                <Form.Group className="city" >
                                <i className="bi bi-compass icon"></i>
                                    <Form.Control  
                                    type="text" 
                                    placeholder="City"
                                    onChange={handleCityChange} 
                                    className={formValidationFailed && !city ? 'form-control-error' : ''}
                                    />
                                </Form.Group>
                            </div>
                            <i className="bi bi-pin-map iconfour"></i>
                            <Form.Select value={selectedCountry} className="country" onChange={handleCountryChange}>
                                {initiaCountry && (
                                    <option key={initiaCountry} value={initiaCountry}>{initiaCountry}</option>
                                )}
                                {countries.getNames().map((country, index) => {
                                    if (country !== initiaCountry) {
                                        return <option key={index} value={country}>{country}</option>;
                                    }
                                    return null; 
                                })}
                            </Form.Select>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button className="payment-info-button" onClick={handleProceedToCheckout}>Proceed to Payment</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showPaymentModal} className="my-custom-modal" onHide={() => setShowPaymentModal(false)}>
                <Modal.Header className="modal-header">
                        <div className="close-area-two" onClick={handleReturnToCheckout}>
                            <span aria-hidden="true">&larr;</span>
                        </div>
                        <Modal.Title className="modal-title">
                            <h6>VanShoppFY</h6>
                            <p>your total is {formatPrice(totalAmount)}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="secondModalBody">
                        <Form>
                            <Form.Group controlId="paymentCardNumber">
                            <div className="person"> 
                                <i class="bi bi-credit-card icontwo"></i>
                                <Form.Control type="text" placeholder="Enter card number" />
                            </div>
                            </Form.Group>
                            <div className="monthcvvdiv">
                                <Form.Group className="month" controlId="paymentMonth">
                                    <i className="bi bi-calendar-day icon"></i>
                                    <Form.Control type="text" placeholder="MM/YY" />
                                </Form.Group>
                                <Form.Group className="cvv" controlId="paymentCVV">
                                    <i className="bi bi-file-lock icon"></i>
                                    <Form.Control type="text" placeholder="CVV" />
                                </Form.Group>
                            </div>
                        </Form>
                        <p className="faketext">*This is a test website please use the following credit card to proceed with purchase*</p>
                        <p className="faketext">1234 5678 8910 1112 - Exp: 10/30 - CVV 456</p> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="payment-info-button" onClick={() => {/* Handle payment submission here */}}>
                            Submit Payment
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default CartComponent;
