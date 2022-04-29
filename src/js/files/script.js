// Подключение функционала "Чертогов Фрилансера"
import SmoothScroll from "smooth-scroll";
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//========================================================================================================================================================
// main-slider

const searchBurger = document.querySelector('.search-main__burger');

if (searchBurger) {
    const searchMain = document.querySelector('.search-main');

    searchBurger.addEventListener('click', function () {
        searchMain.classList.toggle('search-open')
    });

    const searchClose = document.querySelector('.form-search__btn-close');

    searchClose.addEventListener('click', function () {
        searchMain.classList.remove('search-open')
    });

    document.addEventListener('click', function (e) {
        let target = e.target;

        if (!target.closest('.search-main')) {
            searchMain.classList.remove('search-open')
        }
    })
};

//========================================================================================================================================================
// rent-type
const rentTypeColumns = document.querySelectorAll('.rent-type__column');
const rentTypeButtons = document.querySelectorAll('.rent-type__button');

rentTypeColumns.forEach(column => {
    const item = column.querySelector('.rent-type__item');
    const scrollArrow = item.querySelector('.rent-type__scroll-arrow');

    item.addEventListener('click', itemScroll);
    itemScroll()

    function itemScroll() {
        setTimeout(() => {
            //const itemPaddingTop = parseInt(getComputedStyle(item).paddingTop);
            //const itemPaddingBottom = parseInt(getComputedStyle(item).paddingBottom);
            //const itemWindow = item.clientHeight - itemPaddingTop - itemPaddingBottom;
            //console.log(item.scrollHeight);
            if (item.scrollHeight > item.clientHeight && !item.classList.contains('_scroll-item')) {
                item.classList.add('_scroll-item');
                //console.log(item.clientHeight);
                //console.log(item.scrollHeight);
            }
            if (item.scrollHeight === item.clientHeight && item.classList.contains('_scroll-item')) {
                item.classList.remove('_scroll-item');
            }
        }, 500)
    }

    item.addEventListener('scroll', function () {
        if (item.scrollTop > 20 && !item.classList.contains('_arrow-up')) {
            item.classList.add('_arrow-up');
        }
        if (item.scrollTop < 20 && item.classList.contains('_arrow-up')) {
            item.classList.remove('_arrow-up')
        }

        const arrowUp = item.querySelector('.rent-type__scroll-arrow-up')

        let arrowUpCoord = -item.scrollTop + 15;
        arrowUp.style.bottom = arrowUpCoord + 'px';
    })

    column.addEventListener('click', function (e) {
        if (e.target.closest('.rent-type__button')) {

            column.classList.toggle('_rent-type_active');
            if (item.scrollHeight > item.clientHeight) {
                item.scrollTo({
                    top: item.scrollHeight,
                    behavior: "smooth",
                })
            }

            rentTypeColumns.forEach(columnOth => {
                if (columnOth !== column) {
                    columnOth.classList.remove('_rent-type_active')
                }
            })
        }
        if (e.target.closest('.rent-type__item') && !e.target.closest('button')) {
            column.classList.toggle('_rent-type_active');
        }
        if (e.target.closest('.rent-type__scroll-arrow-down')) {
            item.scrollTo({
                top: item.scrollHeight,
                behavior: "smooth",
            })
            //item.scrollTop = item.scrollHeight;
            //console.log(item.scrollHeight);
        }
        if (e.target.closest('.rent-type__scroll-arrow-up')) {
            item.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    })
})

//========================================================================================================================================================

function videoPlay() {
    const videoBlocks = document.querySelectorAll('[data-video-block]');

    videoBlocks.forEach(videoBlock => {
        const video = videoBlock.querySelector('video');
        const videoButton = videoBlock.querySelector('[data-video-button]');
        videoButton.addEventListener('click', function () {
            videoButton.style.display = "none";
            videoBlock.classList.add('_video-play');
            video.play();
        })
        video.addEventListener('playing', function () {
            videoButton.style.display = "none";
            videoBlock.classList.add('_video-play');
        })
        video.addEventListener("pause", function () {
            videoButton.style.display = "block";
            videoBlock.classList.remove('_video-play');
        })
    })
}

videoPlay();

//========================================================================================================================================================

function initMap() {

    // записываем кординаты центра нужны на данном разрешении
    const centerFind = {
        1200: { lat: 59.937, lng: 30.282 },
        768: { lat: 59.929, lng: 30.261 },
        480: { lat: 59.929, lng: 30.245 },
        1201: { lat: 59.936, lng: 30.297 },
    }

    // разрешения не должны пересекаться, при мин/макс, чтобы не было конфликта
    const mapMatchMedia1200 = window.matchMedia("(max-width: 1200px)"),
        mapMatchMedia768 = window.matchMedia("(max-width: 768px)"),
        mapMatchMedia480 = window.matchMedia("(max-width: 480px)"),
        mapMatchMediaMore1201 = window.matchMedia("(min-width: 1201px)");

    // в массиве матчмедиа должны быть по возрастанию, для правильного определения первоначального центра карты при загрузке на устройстве
    // для этого сортируем масив по значению медиа("(max-width: 1200px)" пример медиа) по возрастанию
    const mapMatchMediaArray = [mapMatchMedia768, mapMatchMedia1200, mapMatchMediaMore1201, mapMatchMedia480];
    mapMatchMediaArray.sort((a, b) => a.media.match(/\d+/)[0] - b.media.match(/\d+/)[0]);

    // ищем первое истинное значение
    const firstMatchTrue = mapMatchMediaArray.find(mapMatchMediaItem => mapMatchMediaItem.matches);
    const firstCenterValue = firstMatchTrue.media.match(/\d+/)[0];
    const firstCenterCoord = centerFind[firstCenterValue];

    // строим карту с нужнымы кординатами центра на устройстве
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13.5,
        center: firstCenterCoord,
        // подключаем стили карты, не работают без регистрации платежного аккаунта гугл
        styles: [
            {
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#24252c"
                    }
                ]
            },
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "color": "#b0b0b0"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#393a41"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "color": "#2b2d33"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#1c1d22"
                    }
                ]
            }
        ],
    });


    // устанавливаем маркер на нужную нам позицию
    const marker = new google.maps.Marker({
        position: { lat: 59.937997, lng: 30.244784 },
        map: map,
        icon: {
            url: 'img/contacts/marker.png',
            //scaledSize: new google.maps.Size(100, 100)
        },
    });

    //* ниже блок работы с инфо окном, если нужно
    // создаем инфо-окно, в даном проекте не нужно было, поэтому коментирую
    /* const contentString = '<p class="_info-window">Мы<br>здесь!</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    }); */

    // чтобы при загрузке инфо-окно сразу было открыто
    //infowindow.open(map, marker);

    // при клике на наш маркер инфо-окно открывалось
    /* marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    }); */


    //* делаем чтобы при клике на маркер появлялась наша форма, если пользователь ее закроет
    // здесь с привязкой к конкретному проекту
    marker.addListener('click', function () {
        const contactsBlock = document.querySelector('.contacts');
        contactsBlock.classList.add('_open-block');
    });


    // навешываем слушатели на все брейкпоинты, чтобы отзывчиво изменялся центр карты при изминении разрешиния экрана
    mapMatchMediaArray.forEach(mapMatchMediaItem => {
        mapMatchMediaItem.addEventListener('change', function () {
            mapMatchMedia(mapMatchMediaItem)
        });
    });

    function mapMatchMedia(mapMatchMediaItem) {
        if (mapMatchMediaItem.matches) {
            const centerValue = mapMatchMediaItem.media.match(/\d+/)[0];
            map.setCenter(centerFind[centerValue]);
            map.setZoom(13.5);
        }
        if (!mapMatchMediaItem.matches) {
            const myIndex = mapMatchMediaArray.indexOf(mapMatchMediaItem);
            const nextMatch = mapMatchMediaArray[myIndex + 1];

            if (nextMatch && nextMatch.matches) {
                const centerValue = nextMatch.media.match(/\d+/)[0];
                map.setCenter(centerFind[centerValue]);
                map.setZoom(13.5);
            }
        }
    }
}
window.initMap = initMap; // чтобы нормально работало при сборке вебпаком

const closeButtonContacts = document.querySelector('.contacts__button-close');
closeButtonContacts.addEventListener('click', function () {
    const contactsBlock = document.querySelector('.contacts');
    contactsBlock.classList.remove('_open-block');
})

//========================================================================================================================================================

