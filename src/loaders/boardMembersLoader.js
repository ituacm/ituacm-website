export const boardMembersLoader = async () => {
  try {
    const response = await fetch("http://localhost:8080/boardMembers");
    if (!response.ok) {
      throw new Response("Failed to fetch board members", { status: 500 });
    }
    return response.json();
  } catch (error) {
    console.error("Error loading board members:", error);
    return [];
  }
};
