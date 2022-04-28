const ListCountries = ({ data }) => {
    return (
        <div className="list">
            {data.map(item => {
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
