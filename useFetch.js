import { useEffect, useRef, useState } from 'react'

export const useFetch = ( url ) => {

    const isMount = useRef(true) //Importante para evitar fugas de memoria

  const [state, setState] = useState({
      data: null,
      loading: true,
      error: null
  })

  useEffect(() => {
    return () => {
        isMount.current = false
        console.log('Desmontado')
    }
  }, [])
  

  useEffect(() => {
    
    setState({
        data: null,
        loading: true,
        error: null
    })
    
    fetch( url )
        .then( resp => resp.json() )
                .then( data => {

                    if( isMount ){

                        console.log('montado')

                        setTimeout(() => {
                            setState({
                                data,
                                loading: false,
                                error: null
                            })
                        }, 500);

                    }else{
                        console.log('No se hizo')
                    }

                } )
  }, [url])
  
  return state

}
