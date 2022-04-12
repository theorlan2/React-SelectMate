import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import 'style/SelectMate.css';

let cont = 0;
type PropsSelectMate = {
    children: ReactElement[];
    defaultText?: string;
    className?: string;
    defaultValue?: string;
    onChange?: (value: string | unknown) => void;
}

export const SelectMate: FunctionComponent<PropsSelectMate> = (props) => {

    const defaultText = useRef('Seleccioná una Opcion');
    const heightUl = useRef(0);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(null as unknown);
    const [indexSelect, setIndexSelect] = useState(0);
    const [isMovil, setIsMovil] = useState({});

    useEffect(() => {
        cont = cont + 1;
        setIndexSelect(cont);
        checkNavigator();
        createListOptions()
    }, []);
    useEffect(() => {
        if(props.onChange){
            props.onChange(value);
        }
    }, [value]);
        
    function checkNavigator() {
        const _navigator = (window.navigator.userAgent || window.navigator.vendor || (window as any).opera);
        const Firfx = /Firefox/i.test(_navigator);
        const movil = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(_navigator);
        const firfoxMobile = (Firfx && movil);
        setIsMovil(movil || firfoxMobile);
    }

    function getFirstChild(): ReactElement {
        let item = {} as ReactElement;
        if (props.children) {
            //@ts-ignore
            item = props.children[0];
        }
        return item;
    }

    function getChild(element: ReactElement) {
        return element.props.children
    }

    function createListOptions() {
        // Creating list to display options 
        if (Array.isArray(props.children)) {
            const firstChild = getFirstChild();
            const itemDefault = props.children.find(item => item.value == props.defaultValue);
            defaultText.current = props.defaultValue && props.defaultValue != '' && itemDefault
                ? itemDefault
                : props.defaultText
                    ? props.defaultText
                    : getChild(firstChild);
        }
    }

    // Method to select the option
    function selectOption(indx: number, selectNumber: number) {
        if (isMovil) {
            selectNumber = selectNumber - 1;
        }
        let li_s = document.querySelectorAll("[data-indx-select='" + indexSelect + "'] .cont_select_int > li");
        const select_optiones = document.querySelectorAll("[data-indx-select='" + indexSelect + "']  > select > option") as NodeListOf<HTMLOptionElement>;
        for (let i = 0; i < li_s.length; i++) {
            if (li_s[i].className == 'active') {
                li_s[i].className = '';
            };
            li_s[indx].className = 'active';
        };
        select_optiones[indx].selected = true;
        setIsActive(false);
        defaultText.current = select_optiones[indx].textContent as string;
        setValue(select_optiones[indx].value);
        closeSelect();
    }// fin SelectOption


    // Method to open the Select    
    function openSelect() {
        const ulWhitLiElements = document.querySelectorAll("[data-indx-select='" + indexSelect + "'] .cont_select_int > li") as NodeListOf<HTMLLIElement>;
        let _heightUl = 0;
        let selectElementOpen = document.querySelectorAll("[data-indx-select='" + indexSelect + "']  select")[0];

        if (isMovil) {
            if (window.document.createEvent) { // All
                const evt = window.document.createEvent("MouseEvents");
                evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                selectElementOpen.dispatchEvent(evt);
                // @ts-ignore
            } else if (selectElementOpen.fireEvent) { // IE
                // @ts-ignore
                selectElementOpen.fireEvent("onmousedown");
            }
        } else {

            for (let i = 0; i < ulWhitLiElements.length; i++) {
                _heightUl += ulWhitLiElements[i].offsetHeight;
            };
            if (isActive == false) {
                setIsActive(true);
                heightUl.current = _heightUl;
            } else {
                setIsActive(false);
                heightUl.current = 0;
            }
        }
    }

    // Method to close the Select
    function closeSelect() {
        heightUl.current = 0;
        setIsActive(false);
    }
    // 
    function changeEvent(event: ChangeEvent<{ selectedIndex: number }>) {
        if (event && event.target) {
            let indx = event.target.selectedIndex;
            changeOption(indx);
        }
    }

    // Method to change the selected option when changing in mobile
    function changeOption(index: number) {
        if (isMovil) {
            //selc = selc -1; 
        }
        const select_optiones = document.querySelectorAll("[data-indx-select='" + indexSelect + "'] > select > option") as NodeListOf<HTMLOptionElement>;
        select_optiones[index].selected = true;
        setValue(select_optiones[index].value);
    }

    return (
        <div className={`${props.className} select_mate`}
            data-indx-select={indexSelect} data-selec-open={isActive} onClick={openSelect} >
            <select defaultValue={props.defaultValue} onChange={(evento: ChangeEvent<{ selectedIndex: number }>) => changeEvent(evento)}  > {props.children} </select>
            <p className="select_opcion" >
                {defaultText.current ? defaultText.current : props.defaultText}
            </p>
            <span className={`icon_select_mate ${isActive ? 'rotate' : ''}`} >
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                    <path d="M0-.75h24v24H0z" fill="none" />
                </svg>
            </span>

            <div className="cont_list_select_mate" >
                <ul className="cont_select_int" style={{ height: heightUl.current }} >
                    {Array.isArray(props.children) && props.children.map((item, i) => <li
                        key={`${i}-list-item`}
                        data-index={indexSelect}
                        data-selec-index={i}
                        className={props.children[i].props.selected == true ? 'active' : ''}
                        onClick={() => selectOption(i, indexSelect)} >
                        {props.children[i].props.children}</li>)}
                </ul>
            </div>
        </div>
    )
}