import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_HOST } from './api_utils';
import { Link } from 'react-router-dom';

const Home = () => {
  const [error, setError] = useState("")
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true);

  const [pages, setPages] = useState([]);

  const handleSubmit = () => {
    if(!name){
      setIsValid(false);
      return;
    }else{
      addPage();
    }
  }

  useEffect(() => {
    async function getAllPages(){
      try {
        const response = await axios.get(`${API_HOST}/pages`);
        setPages(response.data);
      } catch (error) {
        console.log("error :>>>", error);
        setError(error.message);
      }
    }
    getAllPages();
  }, [isLoading])

  async function addPage() {
    try {
      const data = {
        'name' : name
      }
      const response = await axios.post(`${API_HOST}/pages/create`, data);
      setIsLoading(true)
      setName("")
    } catch (error) {
      console.log("error :>>>", error);
      setError(error.message);
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-5'>
          <form id='create-page' onsubmit='return validatForm(event)' novalidate>
            <div className='modal-header'>
              <h5 className='modal-title' id='addPageModalLabel'>Create Page</h5>
            </div>
            <div className='modal-body'>
              <div className='col-auto'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input
                  type='text'
                  className={`form-control form-control-sm ${isValid ? "" : "is-invalid"}`}
                  id='name'
                  name='name'
                  placeholder='Name of Page'
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
                {!isValid && (
                  <div className='invalid-feedback'>
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary btn-sm'
                data-bs-dismiss='modal'
                onclick='clearForm()'
              >
                Clear
              </button>
              <button type='button' onClick={handleSubmit} className='btn btn-primary btn-sm'>
                Save
              </button>
            </div>
          </form>
        </div>
        <div className='col-12 my-2'>
          <table className='table table-bordered table-hover'>
          {error && (
            <div role='alert' className='alert alert-primary'>
              {error}
            </div>
          )}
            <thead>

              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {pages ? pages.map(page => (
                          <tr key={page.id}>
                            <td>{page.id}</td>
                            <td>{page.name}</td>
                            <td>{page.slug}</td>
                            <td>
                              <Link to={`/editor/${page.id}`}>Edit</Link>
                            </td>
                          </tr>
              )) : "No pages yet" }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home