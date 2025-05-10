import Text from '../components/Text/Text';
import Form from '../components/Form/Form'
import { useState, useEffect } from 'react';
import { getPhotos } from '../apiService/photos';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import { ImageModal } from '../components/ImageModal/ImageModal';



const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
const [modalIsOpen, setIsOpen] = useState(false);
const [modalSrc, setModalSrc] = useState("");
const [modalAlt, setModalAlt] = useState("");

useEffect(() => {
  if (!query) return
 const fetchImages = async () => {
  setIsLoading(true)
  try {
    const {photos, per_page, total_results} = await getPhotos(query, page)
    // console.log('photos',photos);
    if(!photos.length){
      return setIsEmpty(true)
    }

  // setImages([...images,...photos] )

   setImages((prevImages)=>[...prevImages,...photos] )
    //prevImages === images самий актуальний на дану секунду часу
   setIsVisible(page<Math.ceil(total_results/per_page))//page < total_pages
    // console.log('Math.ceil(total_results/per_page)', Math.ceil(total_results/per_page));
    
  } catch (error) {
   setError(error) 
  }
  finally {
    setIsLoading(false)
  }
  
 }
fetchImages()
  
}, [page, query])

// console.log('isVisible', isVisible);


const onHandleSubmit = value =>{
 setQuery(value);
 setImages([])//скидаємо попередні картинки в порожній масив
 setPage(1);
 setError(null);
 setIsEmpty(false);
 setIsVisible(false);
};
// console.log('query', query);

const onLoadMore = ()=>{
  setPage((prevPage)=>prevPage + 1)
}

const openModal = (src, alt)=>{
  setIsOpen(true)
  setModalSrc(src)
  setModalAlt(alt)
}
const closeModal = ()=>{
  setIsOpen(false)
  setModalSrc('')
  setModalAlt('')
}

  return (
    <>
    <Form onSubmit={onHandleSubmit}/>
    {images.length >0 && <PhotosGallery images={images} openModal={openModal}/>}
    {isVisible&&(
    <Button onClick={onLoadMore} disabled={isLoading}>{isLoading ? "Loading..." : "Load more"}
    </Button>)}
    {!images.length && !isEmpty &&!error&&( 
      <Text textAlign="center">Let`s begin search 🔎</Text>
    )}
  {isLoading && <Loader/>}
    {error && 
     <Text textAlign="center">❌Something went wrong 🔎</Text> 
    }
    {isEmpty&& (
      <Text textAlign="center">Sorry, there are no images😢</Text> 
    )} 
    <ImageModal modalIsOpen={modalIsOpen} closeModal={closeModal} src={modalSrc} alt={modalAlt}/>
    </>
  );
};

export default Photos;
