import styled from 'styled-components';

const TextInput = styled.input`
  border-color: 1px solid ${(props) => props.theme.veryLightGray};
  display: block;
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.25rem;
`;

export default TextInput;
