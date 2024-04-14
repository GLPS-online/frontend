import * as S from "./AuthPageStyled";
import LogoImageSvg from "../../assets/logo-image.svg";
import LogoTextSvg from "../../assets/logo-text.svg";
import { useNavigate } from "react-router-dom";

export default function AuthPageLogo({ welcomeText }: { welcomeText: string }) {
  const navigate = useNavigate();
  return (
    <div>
      <S.Container onClick={() => navigate("/")}>
        {/* <img className={styles.logoImage} src={LogoImageSvg} alt="logo" />
        <img className={styles.logoText} src={LogoTextSvg} alt="logo" /> */}
      </S.Container>
      <S.WelcomeText>{welcomeText}</S.WelcomeText>
    </div>
  );
}
