import { products } from './data.js';
import { useState } from 'react';
import { getImageUrl } from './utils.js';

export default function Shop() {
  const [card, setCard] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const coupons = [
    { code: 'DISCOUNT10', label: 'ลด 10%', value: 10, type: 'percentage' },
    { code: 'DISCOUNT20', label: 'ลด 20%', value: 20, type: 'percentage' },
  ];

  function addTocard(product) {
    const productInCard = card.find(item => item.id === product.id);
    if (productInCard) {
      setCard(
        card.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCard([...card, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCard(product) {
    setCard(card.filter(item => item.id !== product.id));
  }

  function incrementQuantity(product) {
    setCard(
      card.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrementQuantity(product) {
    setCard(
      card.map(item =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function calculateTotalPrice() {
    return card.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function calculateFinalPrice() {
    const total = calculateTotalPrice();
    const shippingCost = 100;

    const finalPrice = total + shippingCost - discount;
    return finalPrice > 0 ? finalPrice : 0;
  }

  function handleCouponChange(e) {
    const selectedCode = e.target.value;
    const coupon = coupons.find(c => c.code === selectedCode);

    if (coupon) {
      setSelectedCoupon(coupon.code);
      const total = calculateTotalPrice();
      setDiscount((coupon.value / 100) * total); // คำนวณส่วนลดเป็นเปอร์เซ็นต์
    } else {
      setSelectedCoupon('');
      setDiscount(0);
    }
  }

  const filteredProducts = products;

  const listItems = filteredProducts.map(product => (
    <li
      key={product.id}
      className="container"
      onClick={() => addTocard(product)}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
        width: '200px',
        margin: '10px',
      }}
    >
      <img
        src={getImageUrl(product)}
        alt={product.name}
        style={{ width: '150px', height: '150px' }}
      />
      <p>
        <b>{product.name}:</b> {product.profession}
      </p>
      <p>{product.accomplishment}</p>
      <p>ราคา: {product.price} ฿</p>
    </li>
  ));

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: '0',
          backgroundColor: '#d3d3d3', // สีเทาอ่อน
          zIndex: 1000,
          padding: '5px 10px', // ลดขนาด padding
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          textAlign: 'center', // จัดให้อยู่กึ่งกลาง
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#000000' }}>
          บาทาลูบพักตร์ Shop
        </h1>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}></ul>
          <div style={{ position: 'relative' }}>
            <button
              className="botton1"
              onClick={() => setDropdownVisible(!isDropdownVisible)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000000', // เปลี่ยนเป็นสีดำ
                fontSize: '15px',
              }}
            >
              💸
              {card.length > 0 && (
                <span className="span1">
                  {card.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {isDropdownVisible && (
              <div className="downdiv">
                {card.length === 0 ? (
                  <p>ตะกร้าของคุณว่างเปล่า</p>
                ) : (
                  <div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: '0',
                        margin: '0',
                      }}
                    >
                      {card.map(product => (
                        <li
                          key={product.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                          }}
                        >
                          <img
                            src={getImageUrl(product)}
                            alt={product.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              marginRight: '10px',
                            }}
                          />
                          <div>
                            <p style={{ margin: '0' }}>{product.name}</p>
                            <p style={{ margin: '0', fontSize: '12px' }}>
                              ราคา: {product.price * product.quantity} ฿
                            </p>
                          </div>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <p style={{ margin: '0', fontSize: '15px' }}>
                              จำนวนคู่:{' '}
                            </p>
                            <button
                              onClick={() => decrementQuantity(product)}
                              style={{
                                backgroundColor: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'black',
                              }}
                            >
                              -
                            </button>
                            <span
                              style={{ width: '20px', textAlign: 'center' }}
                            >
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(product)}
                              style={{
                                backgroundColor: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'black',
                              }}
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCard(product)}
                              style={{
                                backgroundColor: 'pink',
                                color: 'black',
                                border: 'none',
                                padding: '5px 10px',
                                marginLeft: 'auto',
                                cursor: 'pointer',
                                fontSize: '14px',
                              }}
                            >
                              ลบรายการสินค้า
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p>ราคารวม: {calculateTotalPrice()} ฿</p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <select
                        value={selectedCoupon}
                        onChange={handleCouponChange}
                        style={{
                          padding: '8px',
                          flex: 1,
                          border: '1px solid #000',
                          borderRadius: '5px',
                        }}
                      >
                        <option value="">คูปองส่วนลด</option>
                        {coupons.map(coupon => (
                          <option key={coupon.code} value={coupon.code}>
                            {coupon.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => alert(`คูปอง ${selectedCoupon} ถูกใช้งาน!`)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        เลือก คูปอง
                      </button>
                    </div>
                    <p>ค่าจัดส่ง: 100 ฿</p>
                    <p>
                      ส่วนลด: {discount.toFixed(2)} ฿
                    </p>
                    <p>รวมทั้งสิ้น: {calculateFinalPrice()} ฿</p>
                    <button
                      onClick={() => alert('ชำระเงินเสร็จสิ้น ขอบคุณนะน้องนะที่ใช้บริการนะจ๊ะ')}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      ชำระเงิน
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <h2>สินค้า</h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
          {listItems}
        </ul>
      </main>
    </div>
  );
}
