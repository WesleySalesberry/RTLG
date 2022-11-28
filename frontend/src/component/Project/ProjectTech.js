import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FaJava } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaSass } from "react-icons/fa";
import { useEffect } from "react";

export const ProjectTech = ({ tech }) => {
  const techArr = [];
  console.log(tech)
  if(tech){
  for(let x = 0; x < tech.length; x++){
    switch(tech[x]){
      case 'node':
        techArr.push(<FaNode className="icon node"/>);
        break;
      case 'javascript':
        techArr.push(<FaJsSquare className="icon javascript"/>);
        break;
      case 'java':
        techArr.push(<FaJava className="icon java"/>);
        break;
      case 'html':
        techArr.push(<FaHtml5 className="icon html"/>);
        break;
      case 'react':
        techArr.push(<FaReact className="icon react"/>);
        break;
      case 'angular':
        techArr.push(<FaAngular className="icon angular"/>);
        break;
      case 'css':
        techArr.push(<FaCss3 className="icon css"/>);
        break;
      case 'python':
        techArr.push(<FaPython className="icon python"/>);
        break;
      case 'sass':
        techArr.push(<FaSass className="icon sass"/>);
        break;
      default:
        techArr.push(tech[x]);
        break;
    }
  }
}

    return(
      <div className="section-row">
        <h3 className="section-title">Technologies Used</h3>
        <Row>
        {
          techArr.map(itm => (
            <Col>
              { itm }
            </Col>
          ))
        } 
        </Row>
      </div>
    )
}
        