import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";

export default function AddItem(){
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    const [itemName,setitemName]=useState("")
    const [category,setcategory]=useState("")
    const [quantitiy,setquantitiy]=useState("")
    const [price,setprice]=useState("")
    const [supplier,setsupplier]=useState("")
    const [description,setdescription]=useState("")
    let{id}= useParams()
    
    

    useEffect(() => {
        const getCategories = () => {
            axios.get("http://localhost:4066/api/category/get/")
                .then((res) => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getCategories()
    }, [])

    useEffect(()=>{
        const getItem = async(id)=>{
            try {
                const response = await axios.get(`http://localhost:4066/api/item/get/${id}`)
                const item = response.data
                setitemName(item.itemName)
                setcategory(item.category)
                setquantitiy(item.quantitiy)
                setprice(item.price)
                setsupplier(item.supplier)
                setdescription(item.description)
            } catch (err) {
                console.log(err)
            }
        }
        getItem(id)
    },[id])

    function UpdateData(e){
        e.preventDefault()
        
        const UpdatedItem={
            itemName,
            category,
            quantitiy,
            price,
            supplier,
            description
        }
  
        axios
        .put(`http://localhost:4066/api/item/update/${id}`, UpdatedItem)
        //console.log(id)
        .then(()=>{
            alert("Item Updated")
            navigate('/item/')
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return(
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className='container'>
        <h1>Update item</h1>
        <form onSubmit={UpdateData}>
            <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input type="text"
                    className="form-control" 
                    placeholder='Enter Item Name'
                    name='itemName' 
                    value={itemName}
                    onChange={(e) => setitemName(e.target.value.toUpperCase())}
                    style={{ textTransform: 'uppercase' }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select className="form-select" 
                    value={category}
                    onChange={(e) => {
                        setcategory(e.target.value);
                    }}>
                    {categories.map((category,index)=>(
                        <option key={index} value={category.categoryname}>{category.categoryname}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Quntitiy</label>
                <input type="number" 
                    className="form-control" 
                    placeholder='Enter Quntitiy' 
                    name='Quntitiy'
                    value={quantitiy}
                    onChange={(e) => {
                        setquantitiy(e.target.value);
                    }}
                />
      </div>
      <div className="mb-3">
        <label className="form-label">Price(Rs.)</label>
        <input type="number" 
          className="form-control" 
          min="0" step="0.01"
          placeholder='Enter Per Item Price' 
          name='price'
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
          />
      </div>
      <div className="mb-3">
        <label className="form-label">Supplier </label>
        <input type="text" 
          className="form-control" 
          placeholder='Enter Supplier' 
          name='Supplier' 
          value={supplier}
          onChange={(e) => {
           setsupplier(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" 
          rows="3" 
          placeholder='Enter Item Description' 
          name='Description'
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          >
        </textarea>
      </div>
      <br/>
      <input type='submit' className='btn btn-outline-success btn-block mt-4'/>
    </form>
  </div>
  </div>
  </div>
  </div>
)
}