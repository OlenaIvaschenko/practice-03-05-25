import Text from '../components/Text/Text';
import Form from '../components/Form/Form'
import { useState, useEffect } from 'react';
import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState();
  const [error, setError] = useState(null);



useEffect(() => {
  if (!query) return
 const fetchImages = async () => {
  setIsLoading(true)
  try {
    const data = await getPhotos(query, page)
    console.log('data',data);
    
    
  } catch (error) {
   setError(error) 
  }
  finally {
    setIsLoading(false)
  }
  
 }
fetchImages()
  
}, [page, query])



const onHandleSubmit = value =>{
 setQuery(value)
  
}
console.log('query', query);

  return (
    <>
    <Form onSubmit={onHandleSubmit}/>
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};

export default Photos;
