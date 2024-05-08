import { getCurrentTime } from "@/utils/time";
import * as S from "./MealsPageStyled";
import { useState } from "react";
import { fetchMeals, voteMeal } from "@/api/mealApi";
import { Meal } from "@/interfaces/Meal";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

export default function MealsPage() {
  const { getUser } = useAuth();
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
  const { data = [], isLoading } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: () => fetchMeals(),
  });
  const meals = data.filter((meal) => meal.dayIndex === days.indexOf(selected));

  const queryClient = useQueryClient();
  const { mutate: handleVote } = useMutation({
    mutationFn: async (mealId: string) => {
      await voteMeal(mealId);
    },
    onMutate: async (mealId: string) => {
      await queryClient.cancelQueries({ queryKey: ["meals"] });
      const previousData = queryClient.getQueryData<Meal[]>(["meals"]);
      if (previousData) {
        queryClient.setQueryData<Meal[]>(
          ["meals"],
          previousData.map((meal) => {
            if (meal._id === mealId) {
              return {
                ...meal,
                upVotes: meal.upVotes.includes(getUser()._id)
                  ? meal.upVotes.filter((id) => id !== getUser()._id)
                  : [...meal.upVotes, getUser()._id],
              };
            }
            return meal;
          })
        );
      }
      return { previousData };
    },
    onError: (err, mealId, context) => {
      toast.error("투표에 실패했습니다");
      queryClient.setQueryData(["meals"], context?.previousData);
    },
    onSettled: () => {
      console.log("invalidate");
      queryClient.invalidateQueries({
        queryKey: ["meals"],
      });
    },
  });

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
      {isLoading ? (
        <Spinner />
      ) : meals.length > 0 ? (
        meals.map((meal) => (
          <S.MealContainer key={meal._id + meal.upVotes.length}>
            <S.MealTitle>
              <span>
                {(() => {
                  switch (meal.timeIndex) {
                    case 0:
                      return "아침";
                    case 1:
                      return "점심";
                    case 2:
                      return "저녁";
                    case 3:
                      return "혼정빵";
                  }
                })()}
              </span>
              <S.VoteButton
                $selected={meal.upVotes.includes(getUser()._id)}
                onClick={() => {
                  handleVote(meal._id);
                }}
              >
                <span>👍</span>
                <span>
                  {meal.upVotes.length === 0 ? "" : meal.upVotes.length}
                </span>
              </S.VoteButton>
            </S.MealTitle>
            <S.MenuArea>
              <span
                dangerouslySetInnerHTML={{
                  __html: meal.menu || "",
                }}
              ></span>
            </S.MenuArea>
          </S.MealContainer>
        ))
      ) : (
        <S.MealContainer>급식 정보가 없습니다</S.MealContainer>
      )}

      <S.AllergyInfo>
        알레르기 정보: 1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게
        9.새우 10.돼지고기 11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기
        16.쇠고기 17.오징어 18.조개류(굴, 전복, 홍합 포함) 19.잣
      </S.AllergyInfo>
    </S.Container>
  );
}
