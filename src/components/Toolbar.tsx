import React from 'react';
import { ChevronDown, ArrowUpDown, Filter, Grid as Grid3X3, Upload, Download, Share, Plus, RotateCcw } from 'lucide-react';

interface ToolbarProps {
  onHideFields: () => void;
  onSort: () => void;
  onFilter: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onHideFields, onSort, onFilter }) => {
  const handleToolbarAction = (action: string) => {
    console.log(`Toolbar action: ${action}`);
    
    switch (action) {
      case 'hide-fields':
        onHideFields();
        break;
      case 'sort':
        onSort();
        break;
      case 'filter':
        onFilter();
        break;
      case 'cell-view':
        console.log('Cell view clicked');
        break;
      case 'import':
        console.log('Import clicked');
        break;
      case 'export':
        console.log('Export clicked');
        break;
      case 'share':
        console.log('Share clicked');
        break;
      case 'new-action':
        console.log('New Action clicked');
        break;
      default:
        break;
    }
  };

  const handleTabClick = (tabName: string) => {
    console.log(`Tab clicked: ${tabName}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      {/* Main toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleToolbarAction('toolbar')}
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          >
            <span>Tool bar</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => handleToolbarAction('hide-fields')}
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          >
            <span>Hide fields</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('sort')}
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('filter')}
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('cell-view')}
            className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Cell view</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleToolbarAction('import')}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('export')}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('share')}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <button 
            onClick={() => handleToolbarAction('new-action')}
            className="flex items-center space-x-1 px-4 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Action</span>
          </button>
        </div>
      </div>

      {/* Tab section */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex items-center space-x-2 bg-orange-100 border-b-2 border-orange-500 px-3 py-2 rounded-t-md cursor-pointer hover:bg-orange-200 transition-colors"
          onClick={() => handleTabClick('Q3 Financial Overview')}
        >
          <span className="text-sm font-medium text-orange-800">Q3 Financial Overview</span>
          <RotateCcw className="w-4 h-4 text-orange-500" />
        </div>
        
        <div 
          className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-md cursor-pointer hover:bg-green-200 transition-colors"
          onClick={() => handleTabClick('ABC')}
        >
          <span className="text-sm text-green-800">ABC</span>
          <ChevronDown className="w-4 h-4 text-green-800" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;