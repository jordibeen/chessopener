import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { SET_CATEGORIES } from 'redux/reducers/category';

import CategoryPreviewBoard from './categoryPreviewBoard';

function Categories() {
  const dispatch = useDispatch();
  const storedCategories = useSelector(state => state.category.categories)
  const [categories, setCategories] = useState(storedCategories);

  useEffect(() => {
    if(!categories.length){
      fetch(`${process.env.REACT_APP_API_BASEURL}/api/categories`)
      .then(res => res.json())
      .then((result) => {
        setCategories(result);
        dispatch({
            type: SET_CATEGORIES,
            payload: result
          });
      }, (error) => {
      })
    }
  }, [categories, dispatch])

  if(!categories) return null;

  return (
    <Wrapper>
        {/* <Title>Filter by categories</Title> */}
        <CategoryList>
        {
          categories.map((category) => {
            return (
              <CategoryNavLink key={category.id} to={`/categories/${category.id}`}>
                <CategoryTile>
                  <CategoryPreview>
                    <CategoryPreviewBoard category={category} />
                  </CategoryPreview>
                  <CategoryMeta>
                    <CategoryName>{category.name}</CategoryName>
                    <CategorySequence>{category.sequence}</CategorySequence>
                  </CategoryMeta>
                </CategoryTile>
              </CategoryNavLink>
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
  color: ${props => props.theme.colors.pink};
  padding: 0 16px;
`;

const CategoryList = styled.div`
  padding: 16px;
  height: calc(100% - 38px);
  overflow: scroll;
`;

const CategoryNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.pink};
`;

const CategoryTile = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => props.theme.colors.componentBackground};

  :hover {
    background-color: ${props => props.theme.colors.componentBackgroundHighlight};
  }
`;

const CategoryPreview = styled.div`
  width: 30%;
`;

const CategoryMeta = styled.div`
  width: 70%;
`;

const CategoryName = styled.h2`
  font-size: 1.5rem;
`;

const CategorySequence = styled.span`
  font-size: 1rem;
  font-style: italic;
`;

export default Categories;
