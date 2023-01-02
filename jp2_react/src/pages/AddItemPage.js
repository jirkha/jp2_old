import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
// import ItemForm from '../components/ItemForm'
import { AddButton } from "../components/AddButton";
import Axios from "axios";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//   const schema = yup.object().shape({
//     name: yup.string().required("Required"),
//     materialType: yup.string().required(),
//     costs: yup.number().positive().integer().required(),
//     supplier: yup.string(),
//     link: yup.string(),
//     note: yup.string()
// })

const schema = yup
  .object({
    name: yup.string().required(),
    materialType: yup.string().required(),
    costs: yup.number().positive().integer().required(),
    supplier: yup.string(),
    link: yup.string(),
    note: yup.string(),
  })
  .required();

function AddItemPage(history) {
  // useEffect(() => {
  //   Axios.get('/api/item_types/')
  //   .then(res => {
  //     console.log("MaterialTypes: ", res.data)
  //     setMaterialType(res.data)
  //   }).catch(err => console.log(err))
  // }, [])

  const [items, setItems] = useState([]);
  const [inputValue, setValue] = useState("");
  const [type, setSelectedValue] = useState(null);

  let [name, setName] = useState("");
  //let [type, setType] = useState('')
  let [costs, setCosts] = useState(0);
  let [supplier, setSupplier] = useState("");
  let [link, setLink] = useState("");
  let [note, setNote] = useState("");

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
    console.log("handleInputChange: ", value);
  };

  // handle selection
  const handleChange = (value) => {
    //setSelectedValue(value.id);
    setSelectedValue(value);
    console.log("handleChange: ", value);
  };

  const fetchUsers = () => {
    return Axios.get("/api/item_types/")
      .then((result) => {
        const res = result.data;
        return res;
      })
      .catch((err) => console.log(err));
  };

  const postItem = (e) => {
    e.preventDefault();
    Axios.post("/api/item_add/", {
      name,
      type,
      costs,
      supplier,
      link,
      note,
    })
      .then((res) => {
        console.log("Adding Item: : ", res);
        console.log("type: ", res.data.type);
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  // const handleChange = (selectedOption) => {
  //   console.log('handleChange', selectedOption);
  // }

  // const loadOptions = (searchValue, callback) => {
  //   setTimeout(() => {
  //     const filteredOptions = materialType.filter((option) => option.name.toLowerCase().

  //     includes(searchValue.toLowerCase()));
  //     console.log('loadOptions', searchValue, filteredOptions);
  //     callback(filteredOptions)
  //   }, 0)
  // }

  return (
    // <div className="item">
    //   <FormContainer>
    //       <h1>Vložení materiálu</h1>
    //       <div>
    //         {/* <Form onSubmit={submitHandler}> */}
    //         <Form>
    //             <Form.Group controlId='name'>
    //                 <Form.Label>Název</Form.Label>
    //                 <Form.Control
    //                     type='name'
    //                     required
    //                     // isrequired='true'
    //                     placeholder='Vložte název položky'
    //                     value={name}
    //                     onChange={(e) => setName(e.target.value)}
    //                 >
    //                 </Form.Control>
    //             </Form.Group>
    //             <Form.Group controlId='materialType'>
    //                 <Form.Label>Typ materiálu</Form.Label>
    //                 {/* <Form.Select as="select"
    //                     required
    //                     isrequired='true'
    //                     value={type}
    //                     onChange={(e) => setType(e.target.value).bind(e.target.value)}>
    //                   {materialType.map((opt, index) => (<option key={index} value={opt.id}>
    //                     {opt.name}
    //                     </option>
    //                   ))}
    //                 </Form.Select> */}
    //                 <AsyncSelect
    //                   cacheOptions
    //                   defaultOptions
    //                   value={type}
    //                   getOptionLabel={e => e.name}
    //                   getOptionValue={e => e.id}
    //                   loadOptions={fetchUsers}
    //                   onInputChange={handleInputChange}
    //                   onChange={handleChange}
    //                 />
    //             </Form.Group>
    //             {/* <AsyncSelect loadOptions={loadOptions} defaultOptions isSearchable onChange={handleChange} /> */}
    //             <Form.Group controlId='costs'>
    //                 <Form.Label>Cena</Form.Label>
    //                 <Form.Control
    //                     type='number'
    //                     required
    //                     placeholder='Cena za 1 ks/jednotku (např.kg)'
    //                     value={costs}
    //                     onChange={(e) => setCosts(e.target.value)}
    //                 >
    //                 </Form.Control>
    //             </Form.Group>
    //             <Form.Group controlId='supplier'>
    //                 <Form.Label>Dodavatel</Form.Label>
    //                 <Form.Control
    //                     type='text'
    //                     placeholder='Název dodavatele nebo obchodu'
    //                     value={supplier}
    //                     custom="true"
    //                     onChange={(e) => setSupplier(e.target.value)}
    //                 >
    //                 </Form.Control>
    //             </Form.Group>
    //             <Form.Group controlId='link'>
    //                 <Form.Label>Odkaz</Form.Label>
    //                 <Form.Control
    //                     type='url'
    //                     placeholder='Odkaz na výrobek'
    //                     value={link}
    //                     custom="true"
    //                     onChange={(e) => setLink(e.target.value)}
    //                 >
    //                 </Form.Control>
    //             </Form.Group>
    //             {/* <Form.Group controlId='note'>
    //                 <Form.Label>Poznámka</Form.Label>
    //                 <Form.Control
    //                     type='textarea'
    //                     placeholder=''
    //                     value={note}
    //                     custom
    //                     onChange={(e) => setNote(e.target.value)}
    //                 >
    //                 </Form.Control>
    //             </Form.Group> */}
    //             <textarea className="form-control" placeholder='Poznámka' value={note} rows="5" id="comment" custom="true" onChange={(e) => setNote(e.target.value)}>
    //             </textarea>
    //             <Button type='submit' variant='primary' onClick={postItem}>
    //                               Uložit
    //                       </Button>
    //             <AddButton type='submit'/>
    //         {/* </Form> */}
    //         </Form>
    //       </div>
    //   </FormContainer>
    // </div>

    <div className="item-form">
      <FormContainer>
        <h1>Vložení materiálu</h1>
        <div>
          <form onSubmit={handleSubmit(submitForm)}>
            {/* <Form> */}
            <input
              {...register("name")}
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <p>{errors.name?.message}</p>
            {/* {errors.name && errors.name.message} */}
            {/* <Form.Group controlId='name'>
                    <Form.Label>Název</Form.Label>
                    <Form.Control
                        name='name'
                        type='name'
                        {...register("name", {
                    required: "Required",
                  })}
                        placeholder='Vložte název položky'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                    <p>{ errors.name?.message }</p>
                    {errors.name && errors.name.message}
                </Form.Group>
                <p>{ errors.name?.message }</p> */}
            <Form.Group controlId="materialType">
              <Form.Label>Typ materiálu</Form.Label>
              {/* <Form.Select as="select" 
                        required
                        isrequired='true'
                        value={type}
                        onChange={(e) => setType(e.target.value).bind(e.target.value)}>
                      {materialType.map((opt, index) => (<option key={index} value={opt.id}>
                        {opt.name}
                        </option>
                      ))}
                    </Form.Select> */}
              <AsyncSelect
                cacheOptions
                defaultOptions
                {...register("type")}
                placeholder="Vyberte možnost..."
                // name='materialType'
                // {...register('materialType')}
                value={type}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                loadOptions={fetchUsers}
                onInputChange={handleInputChange}
                onChange={handleChange}
                // onChange={val => {
                //   onChange(val.value);
                //   handleChange(val);
                // }}
              />
              {/* {!isValid && <p>Vyberte typ materiálu</p>} */}
              <p>{errors.type?.message}</p>
            </Form.Group>
            {/* <AsyncSelect loadOptions={loadOptions} defaultOptions isSearchable onChange={handleChange} /> */}
            <Form.Group controlId="costs">
              <Form.Label>Cena</Form.Label>
              <Form.Control
                name="costs"
                type="number"
                {...register("costs")}
                placeholder="Cena za 1 ks/jednotku (např.kg)"
                value={costs}
                onChange={(e) => setCosts(e.target.value)}
              ></Form.Control>
              <p>{errors.costs?.message}</p>
            </Form.Group>
            <Form.Group controlId="supplier">
              <Form.Label>Dodavatel</Form.Label>
              <Form.Control
                name="supplier"
                type="text"
                {...register("supplier")}
                placeholder="Název dodavatele nebo obchodu"
                value={supplier}
                custom="true"
                onChange={(e) => setSupplier(e.target.value)}
              ></Form.Control>
              <p>{errors.supplier?.message}</p>
            </Form.Group>
            <Form.Group controlId="link">
              <Form.Label>Odkaz</Form.Label>
              <Form.Control
                name="link"
                type="url"
                {...register("link")}
                placeholder="Odkaz na výrobek"
                value={link}
                custom="true"
                onChange={(e) => setLink(e.target.value)}
              ></Form.Control>
              <p>{errors.link?.message}</p>
            </Form.Group>
            {/* <Form.Group controlId='note'>
                    <Form.Label>Poznámka</Form.Label>
                    <Form.Control
                        type='textarea'
                        placeholder=''
                        value={note}
                        custom
                        onChange={(e) => setNote(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group> */}
            <textarea
              className="form-control"
              name="note"
              {...register("note")}
              placeholder="Poznámka"
              value={note}
              rows="5"
              id="comment"
              custom="true"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <p>{errors.note?.message}</p>
            {/* <Button 
                  type='submit'
                  variant='primary'
                  onClick={postItem}
                  
                  >
                                  Uložit
                          </Button> */}
            {/* <AddButton type='submit'/> */}

            {/* <Button 
                  type='submit'
                  form="formName"
                  //disabled={!isValid}
                  onSubmit={postItem}
                  >
                      Uložit
                </Button> */}
            <input
              type="submit"
              //disabled={!isValid}
              form="formName"
              onSubmit={postItem}
            />
            {/* </Form> */}
          </form>
        </div>
      </FormContainer>
    </div>
  );
}

export default AddItemPage;
