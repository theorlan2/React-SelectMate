import React, { FunctionComponent } from 'react';

type OptionProps = {
    indexOption: number;
    indexSelect: number;
    selected: boolean;
    selectOption: (index: number, indexSelect: number) => void
}

export const Option: FunctionComponent<OptionProps> = (props) => {

    return (<li
        key={`${props.indexOption}-list-item`}
        data-index={props.indexSelect}
        data-selec-index={props.indexOption}
        className={props.selected == true ? 'active' : ''}
        onClick={() => props.selectOption(props.indexOption, props.indexSelect)} >
        {props.children}</li>);
}