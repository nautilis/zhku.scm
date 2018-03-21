export const myfetch = function (method, url, data){
  let body = null;
  if (method == "POST"){
    body = JSON.stringify(data);
  }
  const fetchOption = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      credentials: "include",
    },
    //mode: "no-cors",
    body: body,
  };
  console.log(fetchOption);

  return fetch(url, fetchOption).then(response =>{
    console.log(response); 
    return response.json();
  })
};