import React from 'react';
import FormPlaceholder from '../components/FormPlaceholder';
import Timeline from '../components/Timeline';
import TimelineContent from '../components/TimelineContent';

const AboutContent = () => (
    <FormPlaceholder column="8" > 
        <div style={{color: '#777', paddingLeft: '20px'}}>
            <h1> About FIIOB Junos </h1> 
        </div>
        
        <div className="col-lg-6">           
            <hr />
            <div className="ibox float-e-margins">
                <div className="ibox-content">               
                    FIIOB Junos Kolkata is an ameteur under-19 football team based in Kolkata emerged out of the facebook group FOOTBALL IS IN OUR BLOOD.
                    <br/> <br/> <br/>

                    <h2>Contact Info</h2>
                    <br/>
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fas fa-envelope"></i> fiiob.footballteam@gmail.com </li>
                        <li class="list-group-item"><i class="fab fa-facebook-square"></i> https://www.facebook.com/pg/FIIOBJunos/</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-lg-6"> 
            <div className="ibox-content">    
                <h2><i class="fas fa-trophy"></i> Milestones</h2>
                <Timeline>
                    
                    <TimelineContent 
                        icon="fas fa-futbol"
                        label1="2016"
                        heading="CHAMPIONS"
                    >
                        FIIOB Youth Cup 2016 - Champions
                    </TimelineContent>

                    <TimelineContent 
                        icon="fas fa-futbol"
                        label1="2015"
                        heading="RUNNERS"
                    >
                        Champions Trophy 2k15 Runners
                    </TimelineContent>
                    
                    <TimelineContent 
                        icon="fas fa-futbol"
                        label1="2015"
                        heading="CHAMPIONS"
                    >
                        FIIOB football4peace Champions
                    </TimelineContent>

                    <TimelineContent 
                        icon="fas fa-futbol"
                        label1="2015"
                        heading="RUNNERS"
                    >
                        FIIOB Youth Cup 2015 - Runners
                    </TimelineContent>

                </Timeline>
            </div>
        </div>
    </FormPlaceholder>
);

export default AboutContent;