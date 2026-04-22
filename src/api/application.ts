const APPLICATION_URL = 'https://dummyjson.com/products/add';

type SubmitPayload = {
  firstName: string;
  lastName: string;
};

export const submitLoanApplication = async ({
  firstName,
  lastName,
}: SubmitPayload): Promise<void> => {
  const response = await fetch(APPLICATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `${firstName} ${lastName}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить заявку. Попробуйте снова.');
  }
};
