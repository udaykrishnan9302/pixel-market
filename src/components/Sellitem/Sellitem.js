import React from 'react'
import { useState } from 'react';
// import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import db from '../../firebase.js'
import Card from '../Card/Card'
import {
    collection,
    addDoc,
  } from 'firebase/firestore';
import {Link} from 'react-router-dom'

const Sellitem = () => {

    const listCollectionRef = collection(db , "digital-art");
    const listCollectionRef2 = collection(db , "explore-digart");

    // const [title, setTitle] = useState(0);
    // const [description, setDescription] = useState(0);
    // const [color, setColor] = useState(0);
    // const [count, setCount] = useState(0);
    // const [seller, setSeller] = useState(0);
    // const [price, setPrice] = useState(0);
    // const [royalties, setRoyalties] = useState(0);

    const [formData, setFormData] = useState({
        id:0,
        title: '',
        imageLink:'https://www.cnet.com/a/img/resize/e547a2e4388fcc5ab560f821ac170a59b9fb0143/hub/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png?auto=webp&fit=crop&height=1200&width=1200',
        description: '',
        color: '',
        count: '',
        seller: '',
        price: '',
        royalties: '',
        collection: '',
    });

    const [selectedCollection, setSelectedCollection] = useState('');

    const handleChange = (e) => {
        console.log("Before Loading",formData["imageLink"])

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createTask = async () => {
        await addDoc(listCollectionRef, { id:formData['id'] ,image:formData['imageLink'] ,title:formData['title'] ,description:formData['description'] ,count:formData['count'] ,seller:formData['seller'] ,price:formData['price'] ,royalties:formData['royalties']})
        await addDoc(listCollectionRef2, { id:formData['id'] ,image:formData['imageLink'] ,title:formData['title'] ,description:formData['description'] ,count:formData['count'] ,seller:formData['seller'] ,price:formData['price'] ,royalties:formData['royalties']})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            createTask();

            console.log('Item added to Firestore');
            setFormData({
                id:0,
                title: '',
                description: '',
                color: '',
                count: '',
                seller: '',
                price: '',
                royalties: '',
                collection: '',
            });
            setSelectedCollection('');
        } catch (error) {
            console.error('Error adding item to Firestore:', error);
        }
    };

    return (
        <div>
            <div className="headers flex flex-col justify-center items-center">
                <div className='text-3xl text-center mt-9 text-white md:text-5xl lg:text-6xl font-semibold tracking-wide pb-2'>Sell single collectible</div>
                <br></br>
                <Link to="/">
                    <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'>Go Back</button>
                </Link>
            </div>
            
            <section id="SellItem" className='xl:flex max-xl:flex-col-reverse xl:gap-12 px-8 my-20 text-white'>
                <div className='flex-grow flex flex-col min-h-[100vh]'>
                    <form onSubmit={handleSubmit} className="max-sm:flex max-sm:flex-col max-sm:items-center">
                        <div className='text-md text-gray-300 font-semibold pb-2 mt-6'>Provide Image Link (Preferred Image Size: 290px X 540px)</div>
                        <input name='imageLink' className='w-full h-[50px] bg-gray-500/25 rounded-lg px-6' type="text" onChange={handleChange}/>
                        <div className='text-md text-gray-300 font-semibold pb-2 mt-6'>Item Details</div>
                        <div className='text-sm text-gray-500 font-normal pb-2 '>Item Title</div>
                        <input className='w-full h-[50px] bg-gray-500/25 rounded-lg px-6 mb-6' type='text' name='title' placeholder='Enter Title' onChange={handleChange} required />
                        <div className='text-sm text-gray-500 font-normal pb-2 '>Item Description</div>
                        <input className='w-full h-[50px] bg-gray-500/25 rounded-lg px-6' type='text' name='description' placeholder='Enter Description' onChange={handleChange} />
                        <div className='flex flex-wrap md:flex-nowrap mt-6 gap-4 w-full '>
                            <div className='w-full'>
                                <div className='text-md text-gray-300 font-semibold pb-2 '>Count</div>
                                <input className='w-full xl:max-w-[200px] h-[50px] bg-gray-500/25 rounded-lg px-6' placeholder='Enter Count' type='number' name='count' onChange={handleChange} />
                            </div>
                            <div className='w-full'>
                                <div className='text-md text-gray-300 font-semibold pb-2 '>Seller name</div>
                                <input className='w-full xl:max-w-[200px] h-[50px] bg-gray-500/25 rounded-lg px-6' placeholder='Enter Seller' type='text' name='seller' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='border-b border-gray-500/25 pb-6 w-full '>
                            <div className='text-md text-gray-300 font-semibold pb-2 mt-6'>Price</div>
                            <div className='text-sm text-gray-500 font-normal pb-2 '>Set your price</div>
                            <input className='w-full h-[50px] bg-gray-500/25 rounded-lg px-6 mb-6' placeholder='Enter Price' type='number' name='price' onChange={handleChange} required/>
                            <div className='text-sm text-gray-500 font-normal pb-2 '>Royalties</div>
                            <input className=' w-full h-[50px] bg-gray-500/25 rounded-lg px-6' placeholder='Enter Royalties' type='text' name='royalties' onChange={handleChange} />
                        </div>
                        <div className='text-md text-gray-300 font-semibold pb-2 mt-6'>Choose collection</div>
                        <div className='text-sm text-gray-500 font-normal pb-2 '>Choose an exiting Categories</div>
                        <div className='flex max-md:flex-wrap gap-6 mt-6 w-full '>
                            <div className='w-full'>
                                <div className={`h-[100px] rounded-lg px-6 flex items-center justify-center ${selectedCollection === 'sale' ? 'bg-cyan-500' : 'bg-gray-500/25'}`} onClick={() => setSelectedCollection('sale')}>
                                    Sale
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className={`h-[100px] rounded-lg px-6 flex items-center justify-center ${selectedCollection === 'offers' ? 'bg-cyan-500' : 'bg-gray-500/25'}`} onClick={() => setSelectedCollection('offers')}>
                                    Offers
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className={`h-[100px] rounded-lg px-6 flex items-center justify-center ${selectedCollection === 'cosmos' ? 'bg-cyan-500' : 'bg-gray-500/25'}`} onClick={() => setSelectedCollection('cosmos')}>
                                    Cosmos
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className={`h-[100px] rounded-lg px-6 flex items-center justify-center ${selectedCollection === 'artwork' ? 'bg-cyan-500' : 'bg-gray-500/25'}`} onClick={() => setSelectedCollection('artwork')}>
                                    Artwork
                                </div>
                            </div>

                        </div>
                        <button type='submit' className='p-4 max-w-[200px] text-xl font-semibold border border-gray-500/25 px-6 mt-20 bg-indigo-700 hover:bg-indigo-600 mb-20 transition-all ease-in-out active:scale-95 rounded-sm'>Sell Item</button>
                    </form>
                </div>
                <div className='flex justify-center'>
                    <Card image={formData['imageLink']} name={formData['title']} price={formData['price']} number={formData['count']} />
                </div>
            </section>
        </div>
    )
}

export default Sellitem