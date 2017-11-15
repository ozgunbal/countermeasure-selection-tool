import React from 'react';

const Header = () => {
    const style = {
        border: '1px solid black',
        borderRadius: '5px',
        fontSize: '80%',
        fontFamily: 'sans-serif',
        color: 'darkblue',
        textAlign: 'center'
    }
    return(
        <div style={style}>
            <h4>This is tool foor calculation Return on Response Investment (RORI) index.</h4>
            <span><b>Reference:</b> Granadillo, Gustavo & Garcia-Alfaro, Joaquin & Debar, Hervé. (2015). Using a 3D geometrical model to improve accuracy in the evaluation and selection of countermeasures against complex cyber attacks. . 10.13140/RG.2.1.3232.7127.</span>
        </div>
    )
}

export default Header;