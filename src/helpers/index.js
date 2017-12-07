/*Functions to help*/
  const joinArrays = (currentArray, newArray) => {

    let items = newArray.map((item) => {
      return {
          id: item.complex_id,
          img: item.image,
          address: item.address,
          caption: item.caption,
          delivery:  item.term_of_delivery,
          flats_count: item.flats_count,
          price_min: item.flats_min_price,
          sqm_max : item && item.flats ? item.flats.sqm_max : 0,
          sqm_min : item && item.flats ? item.flats.sqm_min : 0
      }
    });

    return [...currentArray, ...items];
  }

  const createGuid = () =>{
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  
  export default {
    joinArrays,
    createGuid
  }