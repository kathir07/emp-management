const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { Department } =  require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create Department
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment =  async(departmentBody) => {
    try {
        if(await Department.isNameTaken(departmentBody.name, departmentBody.company)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.DEPARTMENT.NAME_EXISTS)
        }
        return Department.create(departmentBody);
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Query for Departments
 * @param {Object} filter - mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Query<Result>} 
 */
const queryDepartments = async(filter, options) => {
    const departments = await Department.paginate(filter, options)
    return departments
}

/**
 * Get Department details by Id
 * @param {ObjectId} departmentId
 * @returns {Promise<Result>}
 */
const getDepartmentById = async(departmentId) => {
    const department = await Department.findOne({_id: departmentId}).populate('company')

    if(!department) {
        throw new ApiError(httpStatus.NOT_FOUND, resMessage.DEPARTMENT)
    }

    return department
}

/**
 * Update Department details by ID
 * @param {ObjectId} departmentId
 * @param {Object} departmentBody
 * @returns {Promise<Result>}
 */
const updateDepartmentById = async(departmentId, departmentBody) => {
    try {
        const department = await Department.findOne({ _id: departmentId });

        if(!department) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.DEPARTMENT.NOT_FOUND);
        }

        if(await Department.isNameTaken(departmentBody.name, departmentBody.company, departmentId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.DEPARTMENT.NAME_EXISTS)
        }

        Object.assign(department, departmentBody);
        await department.save();
        return department;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Department by ID
 * @param {ObjectId} departmentId
 * @returns {Promise<Result>}
 */
const deleteDepartment = async(departmentId) => {
    try {
        const department = await Department.findById(departmentId)

        if(!department) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.DEPARTMENT.NOT_FOUND)
        }

        await department.deleteOne();
        return department;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

module.exports = { createDepartment, queryDepartments, getDepartmentById, updateDepartmentById, deleteDepartment }