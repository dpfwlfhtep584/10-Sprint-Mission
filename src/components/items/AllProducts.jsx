import { API_USEDS_GOODS_PRODUCTS } from "config/api";
import { fetchData } from "api/fetchData";
import { useEffect, useState } from "react";
import styles from './AllProducts.module.css';
import {ReactComponent as DropdownArrowDown} from 'assets/imgs/ic_arrow_down.svg';
import {ReactComponent as PageArrowLeft} from 'assets/imgs/arrow_left.svg';
import {ReactComponent as PageArrowRight} from 'assets/imgs/arrow_right.svg';
import {ReactComponent as EmptyHeart} from 'assets/imgs/empty_heart.svg';
import {ReactComponent as FillHeart} from 'assets/imgs/fill_heart.svg';

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortProduct, setSortProduct] = useState('최신순');
  const [isDropdown, setIsDropdown] = useState(false);
  const [isEmptyHeart, setIsEmptyHeart] = useState(true);

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetchData(API_USEDS_GOODS_PRODUCTS, {});
      setData(response.data.list);
      setLoading(response.loading);
      setError(response.error);
    }

    asyncFetch();
  }, []);


  return (
    <div className={styles['container']}>
      <h4>전체 상품</h4>
      <div className={styles['search-container']}>
        <input type="text" placeholder="검색할 상품을 입력해주세요" />
        <button>상품 등록하기</button>
        <div className={styles['dropdown']}>
          <span>{sortProduct}<DropdownArrowDown/></span>
          <ul>
            <li>최신순</li>
            <li>좋아요순</li>
          </ul>
        </div>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p>에러 발생</p>}
      {data && 
        <div className={styles['all-product-list']}>
          {data.map((product) => (
            <div key={product.id} className={styles['all-product']}>
              <img className={styles['all-product-img']} src={product.images} alt="제품 이미지" />
              <div className={styles['all-product-info']}>
                <p className={styles['product-title']}>{product.name}</p>
                <p className={styles['product-price']}>{Number(product.price)?.toLocaleString()}</p>
                <p className={styles['product-favorite-count']}><span className={styles['product-heart-img']} onClick={()=> {setIsEmptyHeart(!isEmptyHeart)}}>{isEmptyHeart ? <EmptyHeart/> : <FillHeart/>}</span>{product.favoriteCount}</p>
              </div>
            </div>
            ))
          }
        </div>
      }
      <div className={styles['pagination']}>
        <span><PageArrowLeft/></span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span><PageArrowRight/></span>
      </div>
    </div>
  )
}

export default AllProducts