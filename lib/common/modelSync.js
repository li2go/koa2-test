import model from '../../models';

export default async function modelSync() {
    await model.user.sync();
    await model.account.sync();
    await model.role.sync();
    await model.userRole.sync();
    await model.info.sync();
}