import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';

export const Form = styled.form`
  width: 1200px;
  margin: 0 auto;
`

export const Header = styled.header`
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 0.6rem;
  font-weight: 900;
  font-size: 150%;
`

export const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #219e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #219ebc;
  }
`;

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #219ebc;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 900;
  font-size: 150%;
  &.active {
    color: #000000;
  }
`;

export const Nav = styled.nav`
  background: #ffb703;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  margin-bottom: 0.9rem;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLogo = styled.div`
  margin-right: 11rem;
  font-weight: 900;
  font-size: 150%;
`;

export const NavLogin = styled.div`
  text-decoration:none
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  
  &.active {
    color: #000000;
  }
`;