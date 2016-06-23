import uuid from 'node-uuid';

export function formatCreateData(data) {
	data.id = uuid.v1();
	return data;
}