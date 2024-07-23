import React from 'react';
import { Accordion } from "react-bootstrap";
import "../style/Faq.css"

export default function Faq(props) {
  return (
    <div className='container'>
      <div className="faq-container m-2">


        {props.img ?

          <div className='img-fluid faq-img-container'>
            <img src="./Images/faq_img.svg" className='faq-img' alt="faq" />

          </div>
          : null};

        <h3 className="faq-title"> Frequently Asked Questions </h3>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How does online tailoring work?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>
                <p className='steps'>
                  1. Once you place an order with us, we'll schedule a pickup of your fabric from your home. If you don’t have fabric, We can help you find the best fabric for you.   </p>
                <p className='steps'>
                  2. Next, a dedicated fashion designer will help you style your fabric. You can choose to speak with them on video call or have them visit your home.
                </p>
                <p className='steps'>

                  3. Once the design is confirmed, we'll stitch the garment & ship it to your home under 5-10 working days.
                </p>
                <p className='steps'>
                  4. Alterations, if any, are taken care free of charge.
                </p>
              </div>
            </Accordion.Body>
          </Accordion.Item>



          <Accordion.Item eventKey="1">
            <Accordion.Header>How will you take my measurements?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>
                <h4 className='steps'>
                  We can take your measurement in 3 ways. You can choose your preference while placing your order:
                </h4>
                <p className='steps'>
                  1. At-Home Design Consult: Our Designer will drop by at your home to take your measurements in-person, and also understand your outfit design preferences (Note: available in a few Bengaluru pin codes only)  </p>
                <p className='steps'>


                  2. At-home measurement kit: We’ll send you a measurement kit to help take them accurately at home with a guided video. Please note that you will need to enlist the help of someone to take measurements.
                </p>
                <p className='steps'>

                  3. Sample garment: We can pick up a well-fitting sample garment and replicate the fit for your Binks order. If your sample garment doesn’t fit perfectly, it’s okay. You can tell us where the fit needs to be better, and we’ll ensure we correct that in the outfit we stitch you.

                </p>

              </div>
            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="2">
            <Accordion.Header>Do you help with designing the outfit?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>

                <p className='steps'>
                  Yes. When you place a stitching order with us, we pair you up with one of our personal design consultants who will help design a look for your outfit. While you’re making this choice, he will also help you understand what kind of designs might suit your body type.
                </p>

              </div>
            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="3">
            <Accordion.Header>What kind of clothes do you stitch?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>

                <p className='steps'>
                  We stitch all types of men's clothing, both ethnic & western.
                </p>

              </div>
            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="4">
            <Accordion.Header>How long do you take to deliver an order?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>

                <p className='steps'>
                  We offer 3 delivery types; express delivery in 4 days at an additional cost of Rs. 299, standard delivery in 7 days at no extra cost & no-rush delivery in 10 days with Rs. 99 off the total order.
                </p>

              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>I need my custom outfit in less than 5 working days. Is this possible?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>

                <p className='steps'>
                  Please contact us on our support& we'll try our best to accommodate your request.
                </p>

              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>What if my tailored clothes don’t fit as expected?</Accordion.Header>
            <Accordion.Body>
              <div className='how-its-works container'>

                <p className='steps'>

                  We’ll alter them at no extra charge based on the feedback you provide. And we’ll learn from the process by recording your final measurements for future use.

                </p>

              </div>

            </Accordion.Body>

          </Accordion.Item>

        </Accordion>
      </div>
    </div>
  )
}
