import { Github, Instagram, Linkedin, Mail, Medium, Twitter } from 'icons';
import styled from 'styled-components';

const TaskThree = () => {
  return (
    <div>
      <Main>
        <InfoMain>
          <section>
            <Title>Hello I am Ömer</Title>
            <Info>
              I am a frontend developer who is passionate about coding I am
              interested in the frontend side. I am currently enrolled at
              Suleyman Demirel University for four years.
            </Info>
            <Info>
              I write blog posts whenever I get the chance. You can read my
              blogs and review my projects from the links below.
            </Info>
          </section>
          <PhotoSection>
            <Photo alt="Omer Sahin" height={250} width={250} src="/pp.jpg" />
          </PhotoSection>
        </InfoMain>
        <Links>
          <StyledLink href="https://github.com/1sahinomer1">
            <Github />
          </StyledLink>
          <StyledLink href="https://www.linkedin.com/in/omersahin1/">
            <Linkedin />
          </StyledLink>
          <StyledLink href="https://medium.com/@1sahinomer1">
            <Medium />
          </StyledLink>
          <StyledLink href="https://www.instagram.com/shnomr/">
            <Instagram />
          </StyledLink>
          <StyledLink href="https://twitter.com/1sahinomer1">
            <Twitter />
          </StyledLink>
          <StyledLink href="mailto:1sahinomer1@gmail.com">
            <Mail />
          </StyledLink>
          <StyledLink href="/omerSahinCV.pdf">My Resume</StyledLink>
        </Links>
      </Main>
    </div>
  );
};

export default TaskThree;

export const Main = styled.main`
  width: 70%;
  margin: 100px auto;
  padding: 0 6px;
  display: flex;
  flex-direction: column;
`;

export const InfoMain = styled.section`
  display: flex;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const Info = styled.p`
  margin-top: 30px;
  color: ${(p) => p.theme.fontColor};
  width: 80%;
  @media (max-width: 550px) {
    width: 100%;
    text-align: center;
  }
`;

export const Title = styled.h1`
  color: ${(p) => p.theme.fontColor};
  @media (max-width: 550px) {
    margin-top: 20px;
    text-align: center;
  }
`;
export const PhotoSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Photo = styled.img`
  border-radius: 50%;
`;

export const Links = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 550px) {
    justify-content: center;
    margin-top: 40px;
  }
`;

export const StyledLink = styled.a`
  margin-right: 20px;
  color: ${(p) => p.theme.fontColor};
`;
