import React from "react";
import { categories } from "../constants";

const CategoryTag = (props) => {
    const style = {
        backgroundColor: categories[props.text],
        textAlign: "center",
        display: "inline-block",
        width: "4rem",
        borderRadius: ".5rem",
        padding: ".1em 1em",
    };

    return <span style={style}>{props.text}</span>;
};

export default CategoryTag;
