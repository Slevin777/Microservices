import styled from "styled-components";

const TextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.veryLightGray};
  box-sizing: border-box;
  display: block;
  font-size: 0.9rem;
  padding: 0.25rem;
  resize: vertical;
  width: 100%;
`;

export default TextArea;