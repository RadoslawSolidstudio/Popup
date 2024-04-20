const container = `
<div class="modal" style="display: flex;">
<div style="margin-block: auto; padding-right: 50px;"><img src="/konsola_white.png" alt="Xbox_white" srcset=""></div>
<div>
    <strong>
    <div style="display: flex; justify-content: space-between;">
        <span>Konsola MICROSOFT XBOX ONE S</span>
        <div class="closePopup">X</div>
    </div>
    <span>500GB + FIFA 19</span>
    <div class="price">125,00 zł</div>
    </strong>
    <div style="font-size: 13px; margin-top: 20px;">Rozmiar:</div>
    <div style="padding: 8px 0px;">
        <input type="button" style= "border-color:#0090F6;" value="Ram 32 GB">
        <input type="button" value="Ram 64 GB">
        <input type="button" value="Ram 128 GB">
    </div>

    <div style="font-size: 13px; margin-top: 15px;">Wariant:</div>
    <select style="text-align: left; width: 100%; padding: 8px; margin-top: 8px;" name="color">
    </select>
    <div class="deliver">
        <div style="margin:5px">
            <img src="/ok.png" alt="Ok">
        </div>
        <div style="margin:5px">
            <span id="quantity">Produkt dostępny</span>
        </div>
        <div style="margin:5px 10px 0px 30px">
            <img src="/delivery-time-tool.png" alt="Czas dostawy">
        </div>
        <div>
            <span>Możemy wysłać już dzisiaj!<br><span style="color: #0090F6;">Sprawdź czas i koszty wysyłki</span></span><br>
        </div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 20px; margin-left:5px;">
        <div class="qty"><span class="addQty">-</span><span id="number">1</span><span class="addQty">+</span></div>
        <input style="font-size: 15px; background-color: #0090F6; color: white; border-style: none; margin: 0; width: 55%;" type="button" value="Dodaj do koszyka">
    </div>
</div>
</div>
`

const product = {
    "product": {
        "id": 1,
        "name": "Konsola MICROSOFT XBOX ONE S 500GB + FIFA 19",
        "code": "10000053",
        "icon": "\/data\/gfx\/icons\/large\/7\/0\/7.jpg",
        "link": "\/pl\/products\/xbox-4-slim-7.html",
        "product_type": "product_item"
    },
    "sizes": {
        "unit": "szt.",
        "unit_single": "szt.",
        "unit_plural": "szt.",
        "unit_fraction": "sztuka",
        "unit_precision": "0",
        "unit_sellby": 1,
        "items": {
            "U": {
                "type": "U",
                "name": "Ram 32 GB",
                "amount": 1,
                "status": "Produkt dostępny",
                "price": 125.00
            },
            "V": {
                "type": "V",
                "name": "Ram 64 GB",
                "amount": 12,
                "status": "Produkt dostępny",
                "price": 159.00
            },
            "W": {
                "type": "W",
                "name": "Ram 128 GB",
                "amount": 0,
                "status": "Produkt niedostępny",
                "price": 199.00
            }
        }
    },
    "multiversions": [{
        "id": "1",
        "name": "Wariant",
        "items": {
            "1-1": {
                "enabled": true,
                "selected": true,
                "products": [{
                    "product_id": 7,
                    "version_priority": "1",
                    "url": "\/pl\/products\/xbox-7.html",
                    "price_difference": "0.00"
                }],
                "values": {
                    "61": {
                        "id": 61,
                        "name": "Srebrny"
                    }
                },
                "values_id": "61"
            },
            "1-2": {
                "enabled": true,
                "products": [{
                    "product_id": 8,
                    "version_priority": "2",
                    "url": "\/pl\/products\/xbox-4-slim-8.html",
                    "price_difference": "-5.00"
                }],
                "values": {
                    "60": {
                        "id": 60,
                        "name": "Czarny"
                    }
                },
                "values_id": "60"
            },
            "1-3": {
                "enabled": true,
                "products": [{
                    "product_id": 27,
                    "version_priority": "2",
                    "url": "\/pl\/products\/xbox-4-slim-27.html",
                    "price_difference": "-10.00"
                }],
                "values": {
                    "59": {
                        "id": 59,
                        "name": "Biały"
                    }
                },
                "values_id": "59"
            }
        }
    }]

}

document.querySelector('button').addEventListener('click', () => {


    //Wyświetlanie / zmykanie okna
    document.querySelector('.modal-container').innerHTML = container;
    document.querySelector('.modal-container').style.display = 'flex';

    document.querySelector('.closePopup').addEventListener('click', () => {
        document.querySelector('.modal-container').style.display = 'none';
    })


    //Zmiana ilości towaru
    let quaNumber = document.querySelector('#number');
    document.querySelectorAll('.addQty').forEach((e) => {
        e.addEventListener('click', () => {
            if (e.innerText == '-' && Number(quaNumber.innerText) >= 2) {
                quaNumber.innerHTML = Number(quaNumber.innerText) - 1;
                totalPrice();
            }
            if (e.innerText == '+') {
                quaNumber.innerHTML = Number(quaNumber.innerText) + 1;
                totalPrice();
            }
        })
    })


    //Zmiana koloru oraz ceny
    let currentPrice = 125;
console.log(test)
    document.querySelectorAll('input').forEach((e) => {
        e.addEventListener('click', () => {
            quaNumber.innerHTML = '1';
            document.querySelector('input').style.borderColor = '#C3C7C8';
            Object.entries(product.sizes.items).forEach(
                ([key, value]) => {
                    if (e.value == value.name) {
                        if (document.querySelector('#choose')) {
                            document.querySelectorAll('#choose').forEach((f) => {
                                f.style.borderColor = '#C3C7C8'
                            })
                        }
                        e.style.borderColor = '#0090F6';
                        e.id = 'choose';
                        currentPrice = Number(value.price) - getDifferencePrice()
                        document.querySelector('.price').innerHTML = `${currentPrice.toFixed(2).replace('.',',')} zł`;
                        document.querySelector('#quantity').innerHTML = `${value.status}`;
                        if (value.status == 'Produkt niedostępny') {
                            document.querySelector('.deliver').querySelector('img').src = '/no.png'
                        } else {
                            document.querySelector('.deliver').querySelector('img').src = '/ok.png'
                        }
                    }
                })
        })
    })

    const totalPrice = () => {
        document.querySelector('.price').innerHTML = `${((currentPrice - getDifferencePrice()) * Number(quaNumber.innerText)).toFixed(2).replace('.', ',')} zł`
    }


    //Zmiana obrazka
    document.querySelector('select').addEventListener('click', () => {
        totalPrice();
        if (document.querySelector('select').value == 'Czarny') {
            document.querySelector('img').src = '/konsola_black.png'
        } else {
            document.querySelector('img').src = '/konsola_white.png'
        }
    })


    //Pobieranie zmiennych o produkcie
    const getName = () => {
        Object.entries(product.multiversions).forEach(([key, value]) => {
            Object.entries(value.items).forEach(([f, h]) => {
                //Pobieranie nazwy produktu
                Object.entries(h.values).forEach(([v, z]) => {
                    document.querySelector('select').insertAdjacentHTML('beforeEnd', `<option value="${z.name}">${z.name}</option>`);
                })
            })
        })

    }

    const getDifferencePrice = () => {
        let change;
        Object.entries(product.multiversions).forEach(([key, value]) => {

            Object.entries(value.items).forEach(([f, h]) => {
                Object.entries(h.values).forEach(([v, z]) => {
                    if (document.querySelector('select').value == z.name) {

                        change = h.products[0].price_difference;
                        if (change.indexOf('-') == 0) {
                            change = change.slice(1)
                        }
                    }
                })
            })
        })

        return Number(change)
    }
    getName()
})