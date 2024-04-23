import React from "react";

class Products extends React.Component{
    constructor(props)
    {
        super(props)

        this.state = {
            resData : []
        }

    }

    fetchHandler = (event) => {
        fetch(
            'http://localhost:5000/showdata', {
                method:'GET',
                headers: {'Content-type': 'application/json'}                
            }
         ).then(response => response.json())
         .then(data => {
                        
          //  alert(data.response)
            if(data.error != null)
            {
                alert(data.error);
            }
            else{
                this.setState({resData: data.response})
            }
        });

    }

    render(){
        return(
            <div>

                <label> USER INFORMATION</label>
                <input type="button" value="FETCH DATA" onClick={this.fetchHandler}/>
                <table>
                    {this.state.resData.map(item => (<tr>
                    <td> {item.Product_Name} </td> 
                    <td>{item.Price}</td> 
                    <img src={item.img} alt="IImage" />
                    </tr>))}
                    
                </table>
            </div>
        )
    }
}

export default Products;