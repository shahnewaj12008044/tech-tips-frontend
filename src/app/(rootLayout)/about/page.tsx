import MissionVision from '@/components/about-us/mission-vission/mission-vission';
import Organization from '@/components/about-us/organization/organization';
import Team from '@/components/about-us/team/team';
import React from 'react';
;

const AboutPage = () => {
    return (
        <div className='bg-white'>
            <Team />
            <Organization />
            <MissionVision />
        </div>
    );
};

export default AboutPage;