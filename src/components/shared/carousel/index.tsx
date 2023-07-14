import { type QwikMouseEvent, component$, useSignal, $, useVisibleTask$, Slot,useStyles$ } from "@builder.io/qwik";
import { TbChevronLeft, TbChevronRight } from "@qwikest/icons/tablericons";
import styles from "./styles.css?inline";

type SliderParam = {
    slidesPerView: number,
    spaceBetween: number
}

interface CarouselProps {
    sliderParam: SliderParam,
}

export const Carousel = component$(({ sliderParam }: CarouselProps) => {
  
    useStyles$(styles);
    const sliderRef = useSignal<HTMLDivElement>();
    const widthSlider = useSignal<number>(0);
    const isDragging = useSignal(false);
    const startX = useSignal<number>(0);
    const startScrollLeft = useSignal<number>(0);
    

    const dragStart = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
        isDragging.value = true;
        sliderRef.value?.classList.add("dragging");
        startX.value = e.pageX;
        startScrollLeft.value = sliderRef.value?.scrollLeft || 0;
    });

    const dragStop = $(() => {
        isDragging.value = false;
        sliderRef.value?.classList.remove("dragging");
    });


    const dragging = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sliderRef.value == undefined || !isDragging.value) return;
        sliderRef.value.scrollLeft = startScrollLeft.value - (e.pageX - startX.value)
    });

    const nextSlider = $(() => {
        if (sliderRef.value == undefined) return;
        sliderRef.value.scrollLeft += widthSlider.value / sliderParam.slidesPerView;
    });

    const prevSlider = $(() => {
        if (sliderRef.value == undefined) return;
        sliderRef.value.scrollLeft -= widthSlider.value / sliderParam.slidesPerView;
    })


    useVisibleTask$(() => {
        if (sliderRef.value) {
            widthSlider.value = sliderRef.value.clientWidth
        }
        const applyDraggable = (element: Element) => {
            element.setAttribute('draggable', 'false');
            const children = element.children;
            for (let i = 0; i < children.length; i++) {
                applyDraggable(children[i]);
            }
        }

        const divElement = sliderRef.value?.querySelectorAll('.slider-slide');
        console.log(divElement)
        if (divElement) {
            divElement.forEach(el => {

                applyDraggable(el);
            })
        }



    });



    return (
        <div class="slider">
            <div
                class="slider-wrapper"
                style={{
                    gridAutoColumns: `${(widthSlider.value - (sliderParam.spaceBetween * (sliderParam.slidesPerView - 1))) / sliderParam.slidesPerView}px`,
                    gap: `${sliderParam.spaceBetween}px`
                }}
                ref={sliderRef}
                onMouseMove$={dragging}
                onMouseDown$={dragStart}
                onMouseUp$={dragStop}
                onMouseLeave$={dragStop}
            >
                <Slot />
            </div>
            <div class="slider-button-next" onClick$={nextSlider}>
                <TbChevronRight />
            </div>
            <div class="slider-button-prev" onClick$={prevSlider} >
                <TbChevronLeft />
            </div>
        </div>
    )

});

export default Carousel;