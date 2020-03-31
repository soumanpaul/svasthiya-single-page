import React, { useState } from 'react';
import {
    Navbar, NavbarBrand, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    // CarouselCaption
} from 'reactstrap';
const items = [
    {
        src: 'assets/images/mri1.jpg',
        altText: 'Slide 1',
        caption: 'Slide 1',
        header: 'Slide 1 Header',
        key: '1'
    },
    {
        src: 'assets/images/mri2.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2',
        header: 'Slide 2 Header',
        key: '2'
    },
    {
        src: 'assets/images/mri3.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3',
        header: 'Slide 3 Header',
        key: '3'
    }
];
const Header = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} height="500" width="100%" />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        );
    });






    return (
        <React.Fragment>
            <Navbar dark expand="md">
                <div className="container">

                    <NavbarBrand className="nav-logo" href="/">
                        <img src="assets/images/icon1.png" height="55" width="80"
                            alt="Ristorante Con Fusion" />
                    </NavbarBrand>
                        <div className="Title">Svasthiya</div>
                </div>
            </Navbar>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </React.Fragment>
    );

}

export default Header;