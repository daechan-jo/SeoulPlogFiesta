import router from "express";
import userController from "../controllers/userController";
import authenticateJWT from "../middlewares/authenticateJWT";
const userRouter = router();

/** @description 모든 유저 정보 */
userRouter
    .get("/users",
        userController.getAllUsers);


/** @description 랜덤 유저 */
userRouter
    .get("/user/random",
        userController.getRandomUsers);


/** @description 유저 찾기 */
userRouter
    .get("/user/:name",
        authenticateJWT,
        userController.searchUsers);


/** @description 유저 찾기(id) */
userRouter
    .get("/search/:id",
        authenticateJWT,
        userController.searchUserId);


/** @description 현재 사용자 */
userRouter
    .get("/user",
        authenticateJWT,
        userController.currentUser);


/** @description 친구 추가 */
// userRouter
//     .post("/user/add/:id",
//         authenticateJWT,
//         userController.addAsFriend);


/** @description 친구 요청 */
userRouter
    .post("/req/:id",
        authenticateJWT,
        userController.friendRequest);


/** @description 친구 요청 리스트 */
userRouter
    .get("/req/list",
        authenticateJWT,
        userController.friendRequestList);


/** @description 친구 수락 */
userRouter
    .post("/accept/:id",
        authenticateJWT,
        userController.acceptFriend);


/** @description 친구 거절 */
userRouter
    .delete("/reject/:id",
        authenticateJWT,
        userController.rejectFriend);


/** @description 친구 목록 */
userRouter
    .get("/friends",
        authenticateJWT,
        userController.getMyFriends);


/** @description 나의 친구 목록 */
userRouter
    .get("/myfriends",
        authenticateJWT,
        userController.getFriends);


/** @description 친구 삭제 */
userRouter
    .delete("/user/drop/:id",
        authenticateJWT,
        userController.deleteFriend);



module.exports = userRouter;
