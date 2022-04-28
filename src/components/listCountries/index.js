import { useEffect, useState } from 'react';

const ListCountries = ({ content }) => {
    return (
        <div className="list">
            {content.map(item => {
                return (
                    <div key={item.name} className='list-item'>
                        <h3>country: {item.name}</h3>
                        <p>region: {item.region}</p>
                        <p>area: {item.area}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default ListCountries;
