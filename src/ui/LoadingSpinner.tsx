import styled from "styled-components";

interface LoadinSpinnerProps {
  size?: number
}
export const LoadingSpinner = styled.div<LoadinSpinnerProps>`
  display: inline-block;
  width: ${props => props.size? props.size + 'px': '80px'};
  height: ${props => props.size? props.size + 'px': '80px'};

  &:after {
    content: " ";
    display: block;
    width: ${props => props.size? props.size + 'px': '64px'};;
    height: ${props => props.size? props.size + 'px': '64px'};;
    margin: 8px;
    border-radius: 50%;
    z-index: 9999;
    border: 4px solid ${props => props.theme.personal.color};
    border-color: ${props => props.theme.personal.color} transparent ${props => props.theme.personal.color} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;