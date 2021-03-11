import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { SET_CATEGORIES } from 'redux/reducers/category';

function Categories() {
  const dispatch = useDispatch();
  const storedCategories = useSelector(state => state.category.categories)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState(storedCategories);

  useEffect(() => {
    if(!categories.length){
      fetch('http://localhost:7000/api/categories')
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCategories(result);
        dispatch({
            type: SET_CATEGORIES,
            payload: result
          });
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }
  }, [categories, dispatch])

  if(!isLoaded) return null;
  if(error) return null;
  if(!categories) return null;

  return (
    <Wrapper>
        <Title>Categories</Title>
        <CategoryList>
        {
          categories.map((category) => {
            return (
              <CategoryTile key={category.id} to={`/categories/${category.id}`}>{category.name}</CategoryTile>
            )
          })
        }
        </CategoryList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 40%;
  height: 100%;
  @media (${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 30%;
  }
`;

const Title = styled.h1`
`;

const CategoryList = styled.div`
  height: calc(100% - 64px);
  overflow: scroll;
`;

const CategoryTile = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.color3};
  display: block;
`;

export default Categories;
