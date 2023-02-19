import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { toast } from 'react-toastify';
import styles from '../../styles/Students.module.css'
type A = {
    Name: string,
    Class: string,
    Batch: string,
    BYear: string
}

const Students = () => {



    const [data, setData] = useState<A[]>([])
    const [naming, setNaming] = useState<string>("")
    const [classing, setClassing] = useState<string>("")
    const [batching, setBatching] = useState<string>("")
    const [selectedRow, setSelectedRow] = useState(null);
    const [yearing, setYearing] = useState<string>("")
    const [indexing,setIndexing]=useState<number>(0)
    const [flag,setFlag]=useState<boolean>(false)
   
    const [error,setError]=useState("")
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
         setData(items);
        }
      }, []);



    // const alpha = (e: any) => {
    //     setNaming(e.target.value)

    // }
    // const beta = (e: any) => {
    //     setClassing(e.target.value);


    // }
    // const gema = (e: any) => {
    //     setBatching(e.target.value);


    // }
    // const peta = (e: any) => {
    //     setYearing(e.target.value);


    // }


    const onAddHandler = () => {
        if (naming && batching && classing && yearing != "") {
            
            if (!validateInput(naming) && !validateClassing(classing) && !validateBatching(batching) && !validateYearing(yearing)) {
                setError('error showing');
            } else {
                setError('');



                
            
           

            


            let addStudent: A = {
                Name: naming,
                Class: classing,
                Batch: batching,
                BYear: yearing

            }
            // const tempArray= [...data]
            const match = data.find(obj => obj.Name === naming && obj.Class===naming && obj.Batch === batching && obj.BYear ===yearing);
            if(match){
                console.log("match");
                
            }
            else{
                const a = [...data,addStudent]
            setData(a)
            
            
        
            // tempArray.push(addStudent)
            localStorage.setItem('items', JSON.stringify(a));
                
                
            }
            

            
            
            
          
            
            

            // data.push(addStudent)
            // console.log({data,tempArray});
            
            
            

        }}
        else {
            toast.error("plz enter all values")

        }



    }
    function validateInput(naming:any) {
        
        const alphabetRegex = /^[a-zA-Z]+$/;
        return alphabetRegex.test(naming);
    }
    function validateClassing(classing:any) {
        
        const alphabetRegex = /^[a-zA-Z]+$/;
        return alphabetRegex.test(classing);
    }
    function validateBatching(batching:any){
        const alphabetRegex = /^[a-zA-Z0-9]+$/;
        return alphabetRegex.test(batching);

    }
    function validateYearing(batching:any){
        const alphabetRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        return alphabetRegex.test(batching);

    }
    const onDeleteHandler= (inding:number) =>{
        localStorage.removeItem(``);
        let Deleted = data.filter((value,index)=>{
            if(inding !== index){
                return value
            }

    
    

        })
        setData([...Deleted])
        localStorage.setItem("items",JSON.stringify(Deleted))
        toast.success("Data Successfully Deleted")

    }

    const onEditHandler= (valueing:A,inde:number) =>{
        setIndexing(inde)
        setSelectedRow(inde);
        setFlag(true)
        setNaming(valueing.Name)
        setClassing(valueing.Class)
        setBatching(valueing.Batch)
        setYearing(valueing.BYear)

    }
    const onUpdateHandler= () =>{
        setFlag(false)

        if (naming && batching && classing && yearing != "") {


            let addStudent: A = {
                Name: naming,
                Class: classing,
                Batch: batching,
                BYear: yearing

            }
            // const tempArray= [...data]

            let Updated = data.map((value,index)=>{
                if(indexing ===index){
                    return addStudent
                }
                else{
                    return value
                }
            })

            setData([...Updated])
            
            
        
            // tempArray.push(addStudent)
            localStorage.setItem('items', JSON.stringify(Updated));
            
            
          
            
            

            // data.push(addStudent)
            // console.log({data,tempArray});
            
            setNaming("")
            setBatching("")
            setClassing("")
            setYearing("")
            toast.success('🦄 Data Updated Successfully Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            

        }
        else {
            toast.error("Oops Some params are empty")

        }





    }


    const onClearHandler= () =>{
        setSelectedRow(null)
        setFlag(false)
        setNaming("")
        setBatching("")
        setClassing("")
        setYearing("")
    }

    const onDeleteAll = () =>{
        localStorage.clear();
        setData([]);
        

    }



    return (
        <div>

            <div className="d-flex justify-content-center mt-5 mb-5">
        {/* {JSON.stringify(data)} */}
                <div className="card" style={{ width: "24rem" }}>

                    <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8 col-sm-6 col-md-8 col-xs-8"><h3 className="card-title text-center">Input Form</h3></div>
                        <div className="col-lg-4 col-sm-6 col-md-4"><Button value="Clear" color="btn btn-outline-secondary" clickHandler={onClearHandler}/></div>

                    </div>
                        
                        <div className="mb-3">
                            <input type="text" value={naming} className="form-control" placeholder="Name" onChange={e =>setNaming(e.target.value)} />
                            {error && <div>{error}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="text" value={classing} className="form-control" placeholder="Class" onChange={e =>setClassing(e.target.value)} />
                            {error && <div>{error}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="text" value={batching} className="form-control" placeholder="Batch" onChange={e =>setBatching(e.target.value)} />
                            {error && <div>{error}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="date" value={yearing} className="form-control" placeholder="Year" onChange={e =>setYearing(e.target.value)} />
                        </div>
                        {
                            flag ?
                            <div className="text-center">
                        <Button value="Update Student" color="btn btn-outline-warning" clickHandler={onUpdateHandler} />

                    </div>: 
                        
                        <div className="text-center">
                            <Button value="Add Studend" color="btn btn-outline-success" clickHandler={onAddHandler} />

                        </div>
                        
                        }
                        <div className="text-center pt-4">
                            <Button value="Deleted All" color="btn btn-outline-warning" clickHandler={onDeleteAll} />

                        </div>
                        

                    </div>
                </div>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Year</th>
                        <td scope="col">Delete</td>
                        <td scope="col">Update</td>
                    </tr>
                </thead>
                {
                    data.map((value, index) => {
                        return (
                            <tbody>
                                
                                

                                
                                <tr key={index}
                                style={{backgroundColor:selectedRow == index ? "orange":""}}
                                // className={index ==selectedRow ? styles.selected :"" }
                                >
                                    <th scope="row" >{index + 1}</th>
                                    <td>{value.Name}</td>
                                    <td>{value.Class}</td>
                                    <td>{value.Batch}</td>
                                    <td>{value.BYear}</td>
                                    <td>
                                        <Button value="Delete" color="btn btn-outline-danger" clickHandler={()=>onDeleteHandler(index)}/>
                                    </td>
                                    <td>
                            <Button value="Update" color="btn btn-outline-info" clickHandler={()=>onEditHandler(value,index)}/>
                        </td>
                                </tr>

                            </tbody>

                        )
                    })
                }

            </table>

        </div>
    )
}
export default Students