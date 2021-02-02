import React from 'react'

export const UsuariosEvent = ({ usuario }) => {

    const { name, nombre } = usuario;

    return (
        <div>
            <strong> { name } </strong>
            <span>- { nombre } </span>
        </div>
    )
}
