import { useSelector } from 'react-redux';
import './App.css';
import Card from './Components/Card';
import SkeletonLoader from './Components/SkeletonLoader';
import { Tabs } from 'antd'



const HomePage = () => {
  let state = useSelector((state) => state?.data?.apod)
  const savedState = JSON.parse(localStorage.getItem('storedApods'))
  state = savedState ? savedState : state



  return (
    <div className='container'>
   
          <main className='cardList' >
            {
              state ?
                Object.values(state).map((data) => {
                  return (
                    <Card data={data} key={data?.date} />
                  )
                }) :

                <div>
                  <SkeletonLoader num={5} />
                </div>
            }
          </main>
    
    </div>
  );
}

export default HomePage;
