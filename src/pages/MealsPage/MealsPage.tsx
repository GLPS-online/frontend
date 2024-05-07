import { getCurrentTime } from "@/utils/time";
import * as S from "./MealsPageStyled";
import { useState } from "react";

const meals = [
  {
    아침: `백미밥, 김치볶음<sup>5.9</sup>, 낙지수제비<sup>5.6</sup>, 연두부/양념장<sup>5.6</sup>, 모듬소시지볶음<sup>2.5.6.10.12.13.15.16.18</sup>, 시리얼/우유/토스트/주스/김/크림치즈<sup>2.5.6.13</sup>, 그릭요거트<sup>2</sup>`,
    점심: `잡곡밥<sup>5</sup>, 야채계란찜<sup>1</sup>, 감자옹심이국<sup>5.6.17</sup>, 쪽파무생채<sup>13</sup>, 양상추샐러드, 키위D<sup>1.2.5.6</sup>, 치즈떡제육볶음<sup>2.5.6.10.13</sup>, 배추김치<sup>9</sup>, 대추방울토마토<sup>12</sup>`,
    저녁: `백미밥, 근대된장국<sup>5.6</sup>, 동파육<sup>5.6.10.13.18</sup>, 참나물무침, 그린샐러드, 올리브바질드레싱<sup>1.2.5.6</sup>, 배추김치<sup>9</sup>, 타코야끼<sup>1.2.5.6.13</sup>, 모듬쌈/쌈장<sup>5.6.13</sup>`,
    혼정빵: `소보루빵<sup>1.2.4.6.</sup>`,
  },
  {
    아침: `훈제오리볶음밥<sup>5.6.13.18</sup>, 새알단호박죽, 메추리알조림<sup>1.5.6.13</sup>, 오이지무침<sup>13</sup>, 깍두기<sup>9</sup>, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>, 바나나`,
    점심: `잡곡밥<sup>5</sup>, 쇠고기삼색떡국<sup>1.5.6.16</sup>, 밤연근조림<sup>5.6.13</sup>, 봄동나물무침, 양상추샐러드/흑임자D<sup>1.5</sup>, 치킨스테이크<sup>5.6.13.15</sup>, 배추김치<sup>9</sup>`,
    저녁: `미니밥, 토마토스파게티<sup>1.2.5.6.10.12.13</sup>, 양송이스프<sup>2.5.6.13.16</sup>, 망고그린샐러드/망고드레싱<sup>1.2.5.6.12</sup>, 등심돈까스+소스<sup>1.5.6.10.12.13.18</sup>, 콘치즈구이<sup>1.2.5.6.10.13.15.16</sup>, 모듬피클, 깍두기<sup>9</sup>`,
    혼정빵: `체리베리머핀<sup>1.6.13.</sup>`,
  },
  {
    아침: `백미밥, 숭늉, 멸치크랜베리볶음<sup>13</sup>, 묵은지닭찜<sup>9.15</sup>, 백김치<sup>9</sup>, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>, 생과일`,
    점심: `불고기비빔밥<sup>5.6.16</sup>, 배추된장국<sup>5.6</sup>, 잎새만두찜<sup>고기, 김치</sup><sup>1.5.6.10.16.18</sup>, 꿀떡과일샐러드<sup>1.2.5.6</sup>, 명랑한치즈핫도그<sup>1.2.5.6.10.15.18</sup>, 배추김치<sup>9</sup>, 진한초코<sup>13</sup>`,
    저녁: `백미밥, 돈육고추장찌개<sup>5.6.10</sup>, 떡갈비파채무침<sup>5.6.10.13.15.16.18</sup>, 시금치나물무침<sup>5.6</sup>, 양상추배샐러드/요거트드레싱<sup>1.2.5.6</sup>, 찹쌀콩멸치볶음<sup>5.6.13</sup>, 배추김치<sup>9</sup>, 귤<sup>생과</sup>`,
    혼정빵: `야채모닝빵<sup>1.2.6.10.13.</sup>`,
  },
  {
    아침: `백미밥, 조랑떡미역국<sup>5.6</sup>, 참치무조림<sup>5.6</sup>, 두부계란구이+양념장<sup>1.5</sup>, 배추김치<sup>9</sup>, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>, 블루베리`,
    점심: `잡곡밥<sup>5</sup>, 아욱된장국<sup>5.6</sup>, 돼지갈비찜<sup>5.6.10.13</sup>, 양상추샐러드/사우전아일랜D<sup>1.2.5.6</sup>, 한식잡채<sup>5.6.10.13</sup>, 가지두반장볶음<sup>5.6.12.13.18</sup>, 배추김치<sup>9</sup>, 크림슨포도`,
    저녁: `백미밥, 마라탕<sup>1.2.5.6.10.12.13.15.16.18</sup>, 단무지, 두부쑥갓무침<sup>5</sup>, 양상추샐러드/발사믹D<sup>1.2.5.6</sup>, 찹쌀꿔바로탕수육&소스<sup>1.2.5.6.10.11.12.13.18</sup>, 배추김치<sup>9</sup>, 솜사탕`,
    혼정빵: `호두파운드케잌<sup>1.2.6.14.</sup>`,
  },
  {
    아침: `백미밥, 쇠고기무국<sup>16</sup>, 브로콜리+초장<sup>5.6.13</sup>, 미트볼살사소스조림<sup>1.2.5.6.10.12.13.15.16</sup>, 치즈핫바+칠리소스<sup>1.2.5.6.12.13</sup>, 배추김치<sup>9</sup>, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>`,
    점심: `잡곡밥<sup>5</sup>, 두부청국장<sup>5.9</sup>, 우삼겹숙주볶음<sup>5.6.13.16</sup>, 생취나물무침, 귤샐러드/요거트드레싱<sup>1.2.5.6</sup>, 김치전<sup>5.6.9</sup>, 배추김치<sup>9</sup>, 아이스홍시`,
    저녁: `강황밥, 양배추사과샐러드/참깨D<sup>5.6</sup>, 치킨마크니커리<sup>2.5.6.10.12.13.15.16.18</sup>, 어묵떡볶이<sup>1.5.6</sup>, 오다리튀김<sup>1.5.6.17</sup>, 구운또띠아<sup>2.5.6</sup>, 깍두기<sup>9</sup>, 체리토마토<sup>12</sup>`,
    혼정빵: `치즈스틱<sup>1.2.6.</sup>`,
  },
  {
    아침: `백미밥, 황태계란국<sup>1</sup>, 양념깻잎찜<sup>5.6.13</sup>, 돈육간장불고기<sup>5.6.10.13</sup>, 배추김치<sup>9</sup>, 생과일, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>`,
    점심: `잡곡밥<sup>5</sup>, 맑은콩나물국<sup>5</sup>, 깻잎쌈+마요네즈<sup>1.5</sup>, 얼갈이나물무침, 그린샐러드/드레싱<sup>1.2.5.6</sup>, 주꾸미낙지볶음<sup>5.6.13</sup>, 배추김치<sup>9</sup>, 생과일`,
    저녁: `백미밥, 닭개장<sup>13.15</sup>, 깻잎순나물무침, 그린샐러드/드레싱<sup>1.2.5.6</sup>, 코다리양념구이<sup>1.2.5.6</sup>, 배추김치<sup>9</sup>, 꿀배`,
    혼정빵: ` 소프트콘<sup>1.2.6.13.</sup>`,
  },
  {
    아침: `백미밥, 봄동된장국<sup>5.6</sup>, 마파두부<sup>5.6.10.12.13.18</sup>, 베이컨스크램블<sup>1.5.10</sup>, 배추김치<sup>9</sup>, 시리얼/우유/토스트/주스/김<sup>2.5.6.13</sup>, 생과일`,
    점심: `백미밥, 쇠고기감자국<sup>16</sup>, 그린샐러드/드레싱<sup>1.2.5.6</sup>, 참나물무침, 잡채말이어묵볶음<sup>1.5.6.16</sup>, 삼치카레구이<sup>2.5.6.12.13.16</sup>, 배추김치<sup>9</sup>`,
    저녁: `백미밥, 순두부미소장국<sup>5.6</sup>, 무화과연근조림<sup>5.6.13</sup>, 그린샐러드/드레싱<sup>1.2.5.6</sup>, 고구마닭갈비<sup>5.6.13.15</sup>, 팟타이<sup>1.4.5.6.9.13.16</sup>, 배추김치<sup>9</sup>, 생과일`,
    혼정빵: ``,
  },
];

export default function MealsPage() {
  const { month, date, yoil } = getCurrentTime();
  const dateFormatted = date < 10 ? `0${date}` : date + "";
  const dayNumber = Number(month + dateFormatted);
  let jucha = "1주차";
  if (dayNumber > 727) {
    jucha = "2주차";
  }
  if (dayNumber > 803) {
    jucha = "3주차";
  }
  const [selected, setSelected] = useState(yoil);
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <S.Container>
      <h1>
        식단표 🍚<span style={{ fontWeight: "400" }}> ({jucha})</span>
      </h1>
      <S.DateSelectContainer>
        {days.map((day) => (
          <S.DateElement
            key={day}
            $value={day}
            $selected={day === selected}
            onClick={() => setSelected(day)}
          >
            {day}
          </S.DateElement>
        ))}
      </S.DateSelectContainer>
      <S.MealContainer>
        <S.MealTitle>
          <span>아침</span>
          <S.VoteButton>
            <span>👍</span>
            <span></span>
          </S.VoteButton>
        </S.MealTitle>
        <S.MenuArea>
          <span
            dangerouslySetInnerHTML={{
              __html: meals[days.indexOf(selected)]["아침"].replace(
                /(<? *script)/gi,
                "illegalscript"
              ),
            }}
          ></span>
        </S.MenuArea>
      </S.MealContainer>

      <S.MealContainer>
        <S.MealTitle>
          <span>점심</span>
          <S.VoteButton>
            <span>👍</span>
            <span>13</span>
          </S.VoteButton>
        </S.MealTitle>
        <S.MenuArea>
          <span
            dangerouslySetInnerHTML={{
              __html: meals[days.indexOf(selected)]["점심"].replace(
                /(<? *script)/gi,
                "illegalscript"
              ),
            }}
          ></span>
        </S.MenuArea>
      </S.MealContainer>

      <S.MealContainer>
        <S.MealTitle>
          <span>저녁</span>
          <S.VoteButton>
            <span>👍</span>
            <span>13</span>
          </S.VoteButton>
        </S.MealTitle>
        <S.MenuArea>
          <span
            dangerouslySetInnerHTML={{
              __html: meals[days.indexOf(selected)]["저녁"].replace(
                /(<? *script)/gi,
                "illegalscript"
              ),
            }}
          ></span>
        </S.MenuArea>
      </S.MealContainer>
      {selected !== "일" && (
        <S.MealContainer>
          <S.MealTitle>
            <span>혼정빵</span>
            <S.VoteButton>
              <span>👍</span>
              <span>13</span>
            </S.VoteButton>
          </S.MealTitle>
          <S.MenuArea>
            <span
              dangerouslySetInnerHTML={{
                __html: meals[days.indexOf(selected)]["혼정빵"].replace(
                  /(<? *script)/gi,
                  "illegalscript"
                ),
              }}
            ></span>
          </S.MenuArea>
        </S.MealContainer>
      )}

      <S.AllergyInfo>
        알레르기 정보: 1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게
        9.새우 10.돼지고기 11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기
        16.쇠고기 17.오징어 18.조개류(굴, 전복, 홍합 포함) 19.잣
      </S.AllergyInfo>
    </S.Container>
  );
}
