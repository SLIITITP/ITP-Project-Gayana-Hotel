
<select className="form-select" >
    {items.map((item, index) => (
    <option key={index} value={item._id}>{item.itemName}<span value={item.quantitiy}></span></option>

    ))}
</select>