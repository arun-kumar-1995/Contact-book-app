import mongoose from "mongoose";

const CatchAsyncError =
  (controller, useTransaction = false) =>
  async (req, res, next) => {
    // start mongoose session
    const session = useTransaction ? await mongoose.startSession() : null;
    // begin the transaction
    if (session) session.startTransaction();
    try {
      //catch async error and pass to next middleware
      // Pass session to controller
      await Promise.resolve(controller(req, res, next, session));
      // Commit if all succeeds
      if (session) await session.commitTransaction();
    } catch (err) {
      // rollback transaction if error happens
      if (session) await session.abortTransaction();
      // Pass the error to the next middleware
      return next(err);
    } finally {
      // end mongoose session either success or failure
      if (session) session.endSession();
    }
  };

export default CatchAsyncError;
